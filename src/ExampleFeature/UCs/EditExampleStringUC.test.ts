import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { ExampleEntity, makeExampleEntity } from "../Entities/ExampleEntity";
import {
  EditExampleStringUC,
  makeEditSlideTextUC
} from "./EditExampleStringUC";

describe("EditExampleStringUC", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let uc: EditExampleStringUC;
  let mockEntity: ExampleEntity;
  let originalSubmitWarning: any;

  beforeEach(() => {
    appObjects = makeAppObjectRepo();

    // Save original submitWarning function and replace with mock
    originalSubmitWarning = appObjects.submitWarning;
    appObjects.submitWarning = jest.fn();

    appObject = appObjects.getOrCreate("test-id");
    mockEntity = makeExampleEntity(appObject);

    // Create the use case
    uc = makeEditSlideTextUC(appObject);
  });

  afterEach(() => {
    // Restore original submitWarning function
    if (originalSubmitWarning) {
      appObjects.submitWarning = originalSubmitWarning;
    }
  });

  it("should edit the string property in the entity", () => {
    const newValue = "updated text";
    uc.editExampleString(newValue);

    expect(mockEntity.aStringProperty).toBe(newValue);
  });

  it("should log a warning when entity is not found", () => {
    const newAppObject = appObjects.getOrCreate("another-id");

    // Spy on the warn method
    const warnSpy = jest.spyOn(appObjects, "submitWarning");

    const uc = makeEditSlideTextUC(newAppObject);
    const newValue = "updated text";
    uc.editExampleString(newValue);

    // Verify warning was logged
    expect(warnSpy).toHaveBeenCalled();
  });

  it("should be retrievable via static get method", () => {
    const retrievedUC = EditExampleStringUC.get(appObject);
    expect(retrievedUC).toBe(uc);
  });

  it("should be retrievable via static getById method", () => {
    const retrievedUC = EditExampleStringUC.getById("test-id", appObjects);
    expect(retrievedUC).toBe(uc);
  });

  it("should return undefined when getById is called with non-existent id", () => {
    const retrievedUC = EditExampleStringUC.getById(
      "non-existent-id",
      appObjects
    );
    expect(retrievedUC).toBeUndefined();
  });
});
