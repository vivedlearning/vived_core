import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { ExampleEntity, makeExampleEntity } from "../Entities/ExampleEntity";
import { ExamplePM, makeExamplePM } from "./ExamplePM";

describe("ExamplePM", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let entity: ExampleEntity;
  let pm: ExamplePM;

  beforeEach(() => {
    // Set up the test environment
    appObjects = makeAppObjectRepo();
    appObject = appObjects.getOrCreate("test-id");

    // Create and add the entity to the same AppObject
    entity = makeExampleEntity(appObject);

    // Create the PM on the same AppObject
    pm = makeExamplePM(appObject);
  });

  it("should initialize the vm", () => {
    expect(pm.lastVM).not.toBeUndefined();
  });

  it("should update view when entity changes", () => {
    const spy = jest.spyOn(pm, "doUpdateView");

    entity.notifyOnChange();

    expect(spy).toHaveBeenCalled();
  });

	it("should set lastVM to entity string property value", () => {
		const testString = "test value";
		entity.aStringProperty = testString;

		expect(pm.lastVM).toBe(testString);
	});

  it("should return true when comparing same strings in vmsAreEqual", () => {
    expect(pm.vmsAreEqual("same", "same")).toBe(true);
  });

  it("should return false when comparing different strings in vmsAreEqual", () => {
    expect(pm.vmsAreEqual("different", "values")).toBe(false);
  });

  it("should be available via static getById", () => {
    const retrievedPM = ExamplePM.getById("test-id", appObjects);
    expect(retrievedPM).toBe(pm);
  });

  it("should clean up observers on dispose", () => {
    // Spy on removeChangeObserver
    const spy = jest.spyOn(entity, "removeChangeObserver");

    // Dispose the PM
    pm.dispose();

    // Should have called removeChangeObserver
    expect(spy).toHaveBeenCalledWith(expect.any(Function));

    // PM should no longer be attached to the AppObject
    expect(appObject.getComponent(ExamplePM.type)).toBeUndefined();
  });
});
