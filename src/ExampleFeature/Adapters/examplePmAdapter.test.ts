import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { MockExamplePM } from "../Mocks/MockExamplePM";
import { ExamplePM } from "../PMs/ExamplePM";
import { examplePmAdapter } from "./examplePmAdapter";

describe("Example PM Adapter", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let mockPM: ExamplePM;
  const testId = "test-appobject-id";

  beforeEach(() => {
    appObjects = makeAppObjectRepo();
    appObject = appObjects.getOrCreate(testId);
  });
  
  it("has an empty string as default VM", () => {
    expect(examplePmAdapter.defaultVM).toBe("");
  });

  it("adds a view on subscribe", () => {
    // Create the MockExamplePM instance
    mockPM = new MockExamplePM(appObject);

    const addViewSpy = jest.spyOn(mockPM, "addView");
    const setVM = jest.fn();

    examplePmAdapter.subscribe(testId, appObjects, setVM);

    // Verify the view was added
    expect(addViewSpy).toHaveBeenCalledWith(setVM);
  });

  it("removes a view on unsubscribe", () => {
    // Create the MockExamplePM instance
    mockPM = new MockExamplePM(appObject);

    const removeViewSpy = jest.spyOn(mockPM, "removeView");
    const setVM = jest.fn();

    examplePmAdapter.unsubscribe(testId, appObjects, setVM);

    // Verify the view was removed
    expect(removeViewSpy).toHaveBeenCalledWith(setVM);
  });

  it("handles missing id on subscribe by returning early", () => {
    const getByIdSpy = jest.spyOn(ExamplePM, "getById");
    const setVM = jest.fn();

    examplePmAdapter.subscribe("", appObjects, setVM);

    // Should return early without trying to get the PM
    expect(getByIdSpy).not.toHaveBeenCalled();
  });

  it("handles missing PM on subscribe", () => {
    const setVM = jest.fn();
    // Setup the mock to return undefined (PM not found)
    (ExamplePM.getById as jest.Mock).mockReturnValue(undefined);

    appObjects.submitWarning = jest.fn();

    examplePmAdapter.subscribe(testId, appObjects, setVM);

    // Verify error was submitted
    expect(appObjects.submitWarning).toHaveBeenCalledWith(
      "examplePmAdapter",
      "Unable to find ExamplePM"
    );
  });

  it("handles missing PM on unsubscribe without error", () => {
    const setVM = jest.fn();

    // This should not throw an error
    expect(() => {
      examplePmAdapter.unsubscribe(testId, appObjects, setVM);
    }).not.toThrow();
  });
});
