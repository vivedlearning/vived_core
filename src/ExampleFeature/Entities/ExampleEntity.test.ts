import { makeAppObjectRepo } from "../../AppObject";
import { ExampleEntity, makeExampleEntity } from "./ExampleEntity";

describe("ExampleEntity", () => {
  const testId = "test-app-object-id";
  const testString = "test string value";

  let appObjects = makeAppObjectRepo();
  let appObject = appObjects.getOrCreate(testId);
  let entity: ExampleEntity;

  beforeEach(() => {
    // Create a fresh repository and app object for each test
    appObjects = makeAppObjectRepo();
    appObject = appObjects.getOrCreate(testId);
    entity = makeExampleEntity(appObject);
  });

  it("should be created with empty string property", () => {
    expect(entity.aStringProperty).toBe("");
  });

  it("should store and retrieve string property", () => {
    entity.aStringProperty = testString;
    expect(entity.aStringProperty).toBe(testString);
  });

  it("should notify observers when property changes", () => {
    const mockObserver = jest.fn();
    entity.addChangeObserver(mockObserver);

    entity.aStringProperty = testString;
    expect(mockObserver).toHaveBeenCalledTimes(1);

    // Setting the same value should not trigger notification
    entity.aStringProperty = testString;
    expect(mockObserver).toHaveBeenCalledTimes(1);

    // Changing to a new value should trigger notification again
    entity.aStringProperty = "new value";
    expect(mockObserver).toHaveBeenCalledTimes(2);
  });

  it("should be retrievable via static get method", () => {
    const retrieved = ExampleEntity.get(appObject);
    expect(retrieved).toBe(entity);
  });

  it("should be retrievable via static getById method", () => {
    const retrieved = ExampleEntity.getById(testId, appObjects);
    expect(retrieved).toBe(entity);
  });

  it("should add new entity if missing with addIfMissing", () => {
    // Create a new app object without the entity
    const newAppObject = appObjects.getOrCreate("new-id");

    // Should create and add the entity
    const addedEntity = ExampleEntity.addIfMissing(newAppObject);
    expect(addedEntity).toBeDefined();
    expect(ExampleEntity.get(newAppObject)).toBe(addedEntity);
  });

  it("should return existing entity with addIfMissing", () => {
    // Should return the existing entity
    const existingEntity = ExampleEntity.addIfMissing(appObject);
    expect(existingEntity).toBe(entity);
  });
});
