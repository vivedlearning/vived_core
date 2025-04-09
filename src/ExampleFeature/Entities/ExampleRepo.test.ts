import { jest } from "@jest/globals";
import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { makeExampleEntity } from "./ExampleEntity";
import {
  ExampleEntityFactory,
  ExampleRepo,
  makeExampleRepo
} from "./ExampleRepo";

describe("ExampleRepo", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let exampleRepo: ExampleRepo;
  const testId = "test-id";

  beforeEach(() => {
    appObjects = makeAppObjectRepo();
    appObject = appObjects.getOrCreate(testId);
    exampleRepo = makeExampleRepo(appObject);
  });

  it("should create an entity with the default factory", () => {
    // Create an entity
    const entity = exampleRepo.createExampleEntity();

    // Verify the entity was created
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(Object);

    // Verify the entity was added to the repo
    expect(exampleRepo.getAll().length).toBe(1);
    expect(exampleRepo.getAll()[0]).toBe(entity);
  });

  it("should create an entity with custom ID when provided", () => {
    // Create an entity with a custom ID
    const customId = "custom-id";
    const entity = exampleRepo.createExampleEntity(customId);

    // Verify entity has the correct ID
    expect(entity.appObject.id).toBe(customId);

    // Verify we can retrieve it by ID
    expect(exampleRepo.getForAppObject(customId)).toBe(entity);
  });

  it("should use a custom factory when provided", () => {
    const customId = "factory-test-id";

    // Create a mock entity
    const mockEntity = makeExampleEntity(appObjects.getOrCreate(customId));
    const mockFactory = jest
      .fn()
      .mockReturnValue(mockEntity) as ExampleEntityFactory;

    // Replace the default factory
    exampleRepo.exampleEntityFactory = mockFactory;

    const entity = exampleRepo.createExampleEntity(customId);

    // Verify factory was called with correct ID
    expect(mockFactory).toHaveBeenCalledWith(customId);

    // Verify the mock entity was returned and added to the repo
    expect(entity).toBe(mockEntity);
    expect(exampleRepo.getForAppObject(customId)).toBe(mockEntity);
  });

  it("should delete an entity and remove it from the repo", () => {
    // Create an entity
    const customId = "to-delete-id";
    const entity = exampleRepo.createExampleEntity(customId);

    // Mock the dispose method
    const disposeSpy = jest.spyOn(entity.appObject, "dispose");

    // Delete the entity
    exampleRepo.deleteExampleEntity(customId);

    // Verify dispose was called
    expect(disposeSpy).toHaveBeenCalled();

    // Verify entity was removed from repo
    expect(exampleRepo.getForAppObject(customId)).toBeUndefined();
    expect(exampleRepo.getAll().length).toBe(0);
  });

  it("should do nothing when deleting a non-existent entity", () => {
    // Try to delete an entity that doesn't exist
    exampleRepo.deleteExampleEntity("non-existent-id");

    // Nothing should happen (no errors)
    expect(exampleRepo.getAll().length).toBe(0);
  });

  it("should get repo from an AppObject using static get method", () => {
    // Get the repo using the static method
    const gotRepo = ExampleRepo.get(appObject);

    // Verify it's the same repo
    expect(gotRepo).toBe(exampleRepo);
  });

  it("should get repo by id using static getById method", () => {
    // Get the repo using the getById method
    const gotRepo = ExampleRepo.getById(testId, appObjects);

    // Verify it's the same repo
    expect(gotRepo).toBe(exampleRepo);
  });

  it("should add repo if missing using static addIfMissing method", () => {
    // Create a new app object
    const newAppObject = appObjects.getOrCreate("new-test-id");

    // Use addIfMissing to add a repo
    const newRepo = ExampleRepo.addIfMissing(newAppObject);

    // Verify a repo was created
    expect(newRepo).toBeDefined();
    expect(newRepo).toBeInstanceOf(Object);

    // Call addIfMissing again
    const existingRepo = ExampleRepo.addIfMissing(newAppObject);

    // Verify the same repo is returned
    expect(existingRepo).toBe(newRepo);
  });

  it("should notify observers when an entity is added", () => {
    // Create a mock observer
    const mockObserver = jest.fn();
    exampleRepo.addChangeObserver(mockObserver);

    // Create an entity
    exampleRepo.createExampleEntity();

    // Verify observer was notified
    expect(mockObserver).toHaveBeenCalled();
  });

  it("should notify observers when an entity is removed", () => {
    // Create an entity
    const customId = "remove-test-id";
    exampleRepo.createExampleEntity(customId);

    // Create a mock observer
    const mockObserver = jest.fn();
    exampleRepo.addChangeObserver(mockObserver);

    // Reset the mock to clear the creation notification
    mockObserver.mockReset();

    // Remove the entity
    exampleRepo.deleteExampleEntity(customId);

    // Verify observer was notified
    expect(mockObserver).toHaveBeenCalled();
  });
});
