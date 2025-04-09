import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import {
  makeSingletonEntityExample,
  SingletonEntityExample
} from "../Entities/ExampleSingletonEntity";
import {
  ExampleSingletonPM,
  ExampleVM,
  makeExampleSingletonPM
} from "./ExampleSingletonPM";

describe("ExampleSingletonPM", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let entity: SingletonEntityExample;
  let pm: ExampleSingletonPM;
  let registerSingletonSpy: jest.SpyInstance;

  beforeEach(() => {
    // Set up the test environment
    appObjects = makeAppObjectRepo();
    registerSingletonSpy = jest.spyOn(appObjects, "registerSingleton");

    appObject = appObjects.getOrCreate("test-id");

    // Create the singleton entity
    entity = makeSingletonEntityExample(appObject);

    // Create the singleton PM
    pm = makeExampleSingletonPM(appObject);
  });

  it("should initialize with a view model", () => {
    expect(pm.lastVM).not.toBeUndefined();
  });

  it("should be retrievable as a singleton", () => {
    // Test the singleton getter
    const retrievedPM = ExampleSingletonPM.get(appObjects);
    expect(retrievedPM).toBe(pm);
  });

  it("should update view when entity changes", () => {
    const spy = jest.spyOn(pm, "doUpdateView");

    // Trigger a change in the entity
    entity.notifyOnChange();

    expect(spy).toHaveBeenCalled();
  });

  it("should reflect entity's boolean property in view model", () => {
    // Set the entity's property
    entity.aBoolProperty = false;

    // Check that the VM reflects this change
    expect(pm.lastVM?.aBoolProperty).toBe(false);

    // Change the entity's property
    entity.aBoolProperty = true;

    // Check that the VM reflects this change
    expect(pm.lastVM?.aBoolProperty).toBe(true);
  });

  it("should return true when comparing identical view models in vmsAreEqual", () => {
    const vm1: ExampleVM = { aBoolProperty: true };
    const vm2: ExampleVM = { aBoolProperty: true };

    expect(pm.vmsAreEqual(vm1, vm2)).toBe(true);
  });

  it("should return false when comparing different view models in vmsAreEqual", () => {
    const vm1: ExampleVM = { aBoolProperty: true };
    const vm2: ExampleVM = { aBoolProperty: false };

    expect(pm.vmsAreEqual(vm1, vm2)).toBe(false);
  });

  it("should register itself as a singleton", () => {
    expect(registerSingletonSpy).toBeCalledWith(pm);
  });
});
