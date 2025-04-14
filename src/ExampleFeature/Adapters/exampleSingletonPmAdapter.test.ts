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

  beforeEach(() => {
    appObjects = makeAppObjectRepo();
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
    appObjects.submitWarning = jest.fn();
    const setVM = jest.fn();

    exampleSingletonPmAdapter.subscribe(appObjects, setVM);

    expect(appObjects.submitWarning).toHaveBeenCalledWith(
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
    appObjects.submitWarning = jest.fn();
    
    // This should not throw an error
    expect(() => {
      exampleSingletonPmAdapter.unsubscribe(appObjects, setVM);
    }).not.toThrow();
  });
  
});
