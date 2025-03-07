import { ObservableEntity } from "./ObservableEntity";

class ObservableEntityImp extends ObservableEntity {}

function makeTestRig() {
  const observableEntity = new ObservableEntityImp();
  const observer = jest.fn();
  observableEntity.addObserver(observer);

  return { observableEntity, observer };
}

describe("Abstract Observable Entity", () => {
  it("Notifies", () => {
    const { observer, observableEntity } = makeTestRig();
    observableEntity.notify();

    expect(observer).toBeCalled();
  });

  it("Removes an observer", () => {
    const { observer, observableEntity } = makeTestRig();
    observableEntity.removeObserver(observer);
    observableEntity.notify();

    expect(observer).not.toBeCalled();
  });
});
