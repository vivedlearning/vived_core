import { ObserverList } from "./ObserverList";

/**
 * Function type for entity observers
 */
export type EntityObserver = () => void;

/**
 * Base class that implements the Observable pattern.
 * Allows other objects to register as observers and be notified of changes.
 *
 * Extend this class to make your entity observable.
 */
export abstract class ObservableEntity {
  private observerList = new ObserverList<void>();

  /**
   * Registers a new observer to be notified of changes
   * @param observer Function to be called when the entity changes
   */
  addObserver = (observer: EntityObserver): void => {
    this.observerList.add(observer);
  };

  /**
   * Unregisters an existing observer
   * @param observer The observer function to remove
   */
  removeObserver = (observer: EntityObserver): void => {
    this.observerList.remove(observer);
  };

  /**
   * Notifies all registered observers about a change
   */
  notify = () => {
    this.observerList.notify();
  };
}
