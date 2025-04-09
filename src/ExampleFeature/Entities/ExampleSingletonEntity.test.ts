import { AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import {
  SingletonEntityExample,
  makeSingletonEntityExample
} from "./ExampleSingletonEntity";

describe("SingletonEntityExample", () => {
  let appObjects: AppObjectRepo;
  let entity: SingletonEntityExample;
  let registerSingletonSpy: jest.SpyInstance

  beforeEach(() => {
    // Create a fresh AppObjectRepo for each test
    appObjects = makeAppObjectRepo();
    registerSingletonSpy = jest.spyOn(appObjects, "registerSingleton");

    // Create the entity using the factory function
    entity = makeSingletonEntityExample(appObjects.getOrCreate("test-entity"));
  });

  it("should initialize with default boolean property value", () => {
    // Check that the default value is false
    expect(entity.aBoolProperty).toBe(false);
  });

  it("should update boolean property when changed", () => {
    // Change the property value
    entity.aBoolProperty = true;
    // Verify the value was updated
    expect(entity.aBoolProperty).toBe(true);
  });

  it("should notify observers when property changes", () => {
    // Create a mock observer function
    const mockObserver = jest.fn();
    // Add the observer to the entity
    entity.addChangeObserver(mockObserver);

    // Verify observer wasn't called yet
    expect(mockObserver).not.toHaveBeenCalled();

    // Change the property
    entity.aBoolProperty = true;

    // Verify observer was called exactly once
    expect(mockObserver).toHaveBeenCalledTimes(1);
  });

  it("should not notify observers when property is set to same value", () => {
    // Set initial value
    entity.aBoolProperty = true;

    // Create a mock observer function
    const mockObserver = jest.fn();
    // Add the observer to the entity
    entity.addChangeObserver(mockObserver);

    // Set the same value again
    entity.aBoolProperty = true;

    // Verify observer wasn't called since value didn't change
    expect(mockObserver).not.toHaveBeenCalled();
  });

  it("should register itself as a singleton", () => {
    expect(registerSingletonSpy).toBeCalledWith(entity);
  });

  it("should be accessible through the static getter", () => {
    // Create a new AppObject
    appObjects.getOrCreate("another-object");

    // The singleton should be accessible from any AppObject
    const retrievedEntity = SingletonEntityExample.get(appObjects);

    // Verify we got the original entity
    expect(retrievedEntity).toBe(entity);
  });
});
