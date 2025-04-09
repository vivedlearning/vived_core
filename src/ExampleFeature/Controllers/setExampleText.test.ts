import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { MockEditExampleStringUC } from "../Mocks/MockEditExampleStringUC";
import { setExampleText } from "./setExampleText";

describe("setExampleText", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let mockUC: MockEditExampleStringUC;
  let mockSetFunction: jest.Mock;
  let originalSubmitWarning: any;
  const testId = "test-appobject-id";

  beforeEach(() => {
    // Create a fresh repository for each test
    appObjects = makeAppObjectRepo();

    // Save original submitWarning function and replace with mock
    originalSubmitWarning = appObjects.submitWarning;
    appObjects.submitWarning = jest.fn();

    appObject = appObjects.getOrCreate(testId);

    // Create and add the mock use case
    mockUC = new MockEditExampleStringUC(appObject);
    mockSetFunction = jest.fn();
    mockUC.editExampleString = mockSetFunction;
  });

  afterEach(() => {
    // Restore original submitWarning function
    if (originalSubmitWarning) {
      appObjects.submitWarning = originalSubmitWarning;
    }
  });

  it("should call EditExampleStringUC with the provided text", () => {
    const testText = "Hello World";

    // Call the controller function
    setExampleText(testText, testId, appObjects);

    // Verify the use case was called with the correct text
    expect(mockSetFunction).toBeCalledWith(testText);
  });

  it("should do nothing when UC cannot be found", () => {
    // Call with an ID that doesn't have the UC
    const nonExistentId = "non-existent-id";

    // This should not throw an error
    expect(() => {
      setExampleText("test", nonExistentId, appObjects);
    }).not.toThrow();

    // Verify our original mock wasn't called
    expect(mockSetFunction).not.toBeCalled();
  });

  it("should submit a warning when UC is not found", () => {
    // Create a new AppObjectRepo without the UC
    const emptyAppObjects = makeAppObjectRepo();

    // Mock submitWarning to prevent console output
    const originalEmptySubmitWarning = emptyAppObjects.submitWarning;
    emptyAppObjects.submitWarning = jest.fn();

    // Spy on the warning submission method
    const submitWarningSpy = jest.spyOn(emptyAppObjects, "submitWarning");

    // Call the controller function with the empty repo
    setExampleText("test", "non-existent-id", emptyAppObjects);

    // Verify warning was submitted
    expect(submitWarningSpy).toHaveBeenCalledWith(
      "setExampleText",
      "Unable to find EditExampleStringUC"
    );

    // Verify that the editExampleString method was not called
    expect(mockSetFunction).not.toHaveBeenCalled();

    // Restore original function
    emptyAppObjects.submitWarning = originalEmptySubmitWarning;
  });
});
