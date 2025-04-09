import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import {
  makeSingletonEntityExample,
  SingletonEntityExample
} from "../Entities/ExampleSingletonEntity";
import {
  makeToggleExampleBooleanUC,
  ToggleExampleBooleanUC
} from "./ToggleExampleBooleanUC";

describe("ToggleExampleBooleanUC", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let entity: SingletonEntityExample;
  let uc: ToggleExampleBooleanUC;
  let registerSingletonSpy: jest.SpyInstance;
  let originalSubmitWarning: any;
  let originalSubmitError: any;

  beforeEach(() => {
    // Create a fresh repository for testing
    appObjects = makeAppObjectRepo();

    // Save original functions and replace with silent mocks
    originalSubmitWarning = appObjects.submitWarning;
    originalSubmitError = appObjects.submitError;
    appObjects.submitWarning = jest.fn();
    appObjects.submitError = jest.fn();

    registerSingletonSpy = jest.spyOn(appObjects, "registerSingleton");

    // Set up the singleton entity
    appObject = appObjects.getOrCreate("test-id");
    entity = makeSingletonEntityExample(appObject);

    // Create the use case
    uc = makeToggleExampleBooleanUC(appObject);
  });

  afterEach(() => {
    // Restore original functions after each test
    if (originalSubmitWarning) {
      appObjects.submitWarning = originalSubmitWarning;
    }
    if (originalSubmitError) {
      appObjects.submitError = originalSubmitError;
    }
  });

  it("should register itself as a singleton", () => {
    // Verify that the UC registered itself as a singleton
    expect(registerSingletonSpy).toHaveBeenCalledWith(uc);
  });

  it("should be accessible through the static getter", () => {
    // Create a new AppObject to verify singleton access from anywhere
    appObjects.getOrCreate("another-id");

    // The UC should be accessible from any AppObject through the singleton getter
    const retrievedUC = ToggleExampleBooleanUC.get(appObjects);

    // Verify we got the original UC
    expect(retrievedUC).toBe(uc);
  });

  it("should toggle entity's boolean property from false to true", () => {
    // Set initial state
    entity.aBoolProperty = false;

    // Execute the toggle use case
    uc.toggleExampleBoolean();

    // Verify the property was toggled
    expect(entity.aBoolProperty).toBe(true);
  });

  it("should toggle entity's boolean property from true to false", () => {
    // Set initial state
    entity.aBoolProperty = true;

    // Execute the toggle use case
    uc.toggleExampleBoolean();

    // Verify the property was toggled
    expect(entity.aBoolProperty).toBe(false);
  });

  it("should log a warning when entity is not found", () => {
    // Create a test scenario where the singleton entity isn't available
    const newAppObjects = makeAppObjectRepo();
    // Mock submitWarning to prevent console output
    newAppObjects.submitWarning = jest.fn();
    newAppObjects.submitError = jest.fn();

    const newAppObject = newAppObjects.getOrCreate("isolated-test");
    const isolatedUC = makeToggleExampleBooleanUC(newAppObject);

    // Spy on the warn method
    const warnSpy = jest.spyOn(isolatedUC, "warn");

    // Execute the use case without the required entity
    isolatedUC.toggleExampleBoolean();

    // Verify warning was logged
    expect(warnSpy).toHaveBeenCalledWith(
      "Unable to find SingletonEntityExample"
    );
  });
});
