import { AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import {
  makeMockToggleExampleBooleanUC, MockToggleExampleBooleanUC
} from "../Mocks/MockToggleExampleBooleanUC";
import { toggleExampleBoolean } from "./toggleExampleBoolean";

describe("toggleExampleBoolean", () => {
  let appObjects: AppObjectRepo;
  let mockUC: MockToggleExampleBooleanUC;
  let mockToggleFunction: jest.Mock;
  let originalConsoleWarn: any;

  // Suppress console warnings before all tests
  beforeAll(() => {
    // Store original console.warn
    originalConsoleWarn = console.warn;
    // Replace with no-op function
    console.warn = jest.fn();
  });

  // Restore console.warn after all tests
  afterAll(() => {
    console.warn = originalConsoleWarn;
  });

  beforeEach(() => {
    appObjects = makeAppObjectRepo();
    // Mock submitWarning to prevent actual warnings
    appObjects.submitWarning = jest.fn();

    // Create the mock UC
    mockUC = makeMockToggleExampleBooleanUC(appObjects.getOrCreate("test-id"));

    // Override the toggleExampleBoolean method with a Jest mock function
    mockToggleFunction = jest.fn();
    mockUC.toggleExampleBoolean = mockToggleFunction;
  });

  it("should call toggleExampleBoolean on the UC", () => {
    // Call the controller function
    toggleExampleBoolean(appObjects);

    // Verify that the mock function was called
    expect(mockToggleFunction).toHaveBeenCalledTimes(1);
  });

  it("should submit a warning when UC is not found", () => {
    // Create a new AppObjectRepo without the UC
    const emptyAppObjects = makeAppObjectRepo();
    
    // Mock submitWarning
    const submitWarningSpy = jest.fn();
    emptyAppObjects.submitWarning = submitWarningSpy;

    // Call the controller function with the empty repo
    toggleExampleBoolean(emptyAppObjects);

    // Verify warning was submitted
    expect(submitWarningSpy).toHaveBeenCalledWith(
      "toggleExampleBoolean",
      "Unable to find ToggleExampleBooleanUC"
    );

    // Verify that the toggleExampleBoolean method was not called
    expect(mockToggleFunction).not.toHaveBeenCalled();
  });
});
