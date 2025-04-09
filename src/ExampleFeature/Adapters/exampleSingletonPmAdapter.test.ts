import { AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { makeMockExampleSingletonPM } from "../Mocks/MockExampleSingletonPM";
import {
  ExampleSingletonPM,
  defaultSlideNavigationVM
} from "../PMs/ExampleSingletonPM";
import { exampleSingletonPmAdapter } from "./exampleSingletonPmAdapter";

describe("Example Singleton PM Adapter", () => {
  let appObjects: AppObjectRepo;
  let mockPM: ExampleSingletonPM;
  let originalSubmitError: any;
  let originalSubmitWarning: any;

  beforeEach(() => {
    appObjects = makeAppObjectRepo();
    // Save original functions
    originalSubmitError = appObjects.submitError;
    originalSubmitWarning = appObjects.submitWarning;
    
    // Replace with silent mocks to prevent console output
    appObjects.submitError = jest.fn();
    appObjects.submitWarning = jest.fn();
  });

  afterEach(() => {
    // Restore original functions after test
    if (originalSubmitError) {
      appObjects.submitError = originalSubmitError;
    }
    if (originalSubmitWarning) {
      appObjects.submitWarning = originalSubmitWarning;
    }
  });

  it("Sets the Default VM", () => {
    mockPM = makeMockExampleSingletonPM(appObjects);
    expect(exampleSingletonPmAdapter.defaultVM).toEqual(
      defaultSlideNavigationVM
    );
  });

  it("Adds a view on subscribe", () => {
    mockPM = makeMockExampleSingletonPM(appObjects);
    const setVM = jest.fn();
    const subscribeSpy = jest.spyOn(mockPM, "addView");
    exampleSingletonPmAdapter.subscribe(appObjects, setVM);

    expect(subscribeSpy).toHaveBeenCalledWith(setVM);
  });

  it("Handles missing PM on subscribe", () => {
    const submitErrorSpy = jest.spyOn(appObjects, "submitError");
    const setVM = jest.fn();

    exampleSingletonPmAdapter.subscribe(appObjects, setVM);

    expect(submitErrorSpy).toHaveBeenCalledWith(
      "exampleSingletonPmAdapter",
      "Unable to find ExampleSingletonPM"
    );
  });

  it("Removes a view on unsubscribe", () => {
    mockPM = makeMockExampleSingletonPM(appObjects);
    const setVM = jest.fn();
    const unsubscribeSpy = jest.spyOn(mockPM, "removeView");
    exampleSingletonPmAdapter.unsubscribe(appObjects, setVM);

    expect(unsubscribeSpy).toHaveBeenCalledWith(setVM);
  });

  it("Handles missing PM on unsubscribe without error", () => {
    const setVM = jest.fn();

    // This should not throw an error
    expect(() => {
      exampleSingletonPmAdapter.unsubscribe(appObjects, setVM);
    }).not.toThrow();
  });
});
