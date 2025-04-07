import { ObserverList } from "../Entities";
import { AppObject } from "./AppObject";
import { AppObjectComponent, AppObjectComponentType } from "./AppObjectComponent";

/**
 * Observer function type for entity state changes or disposal
 * No parameters are passed to the observer functions
 */
export type AppObjectEntityObserver = () => void;

/**
 * Entity component that manages application state
 * 
 * AppObjectEntity is responsible for storing and managing state data within the application.
 * It uses the observer pattern to notify interested parties of changes to its state.
 * 
 * In a typical application flow:
 * 1. Controllers modify entity state in response to user actions
 * 2. Entities notify observers (typically PMs) of state changes
 * 3. PMs transform entity state into view models
 * 4. Views render based on the view models
 */
export class AppObjectEntity extends AppObjectComponent {
  /** Identifies this as an Entity component */
  readonly componentType = AppObjectComponentType.ENTITY;
  
  /** List of observers to notify when this entity is disposed */
  private onDisposeObserverList = new ObserverList<void>();
  
  /**
   * Adds an observer to be notified when this entity is disposed
   * @param observer Function to call on disposal
   */
  addOnDisposeObserver = (observer: AppObjectEntityObserver) => {
    this.onDisposeObserverList.add(observer);
  };
  
  /**
   * Removes a previously added dispose observer
   * @param observer The observer function to remove
   */
  removeOnDisposeObserver = (observer: AppObjectEntityObserver): void => {
    this.onDisposeObserverList.remove(observer);
  };

  /** List of observers to notify when this entity's state changes */
  private onChangeObserverList = new ObserverList<void>();
  
  /**
   * Adds an observer to be notified when this entity's state changes
   * @param observer Function to call on state change
   */
  addChangeObserver = (observer: AppObjectEntityObserver): void => {
    this.onChangeObserverList.add(observer);
  };
  
  /**
   * Removes a previously added change observer
   * @param observer The observer function to remove
   */
  removeChangeObserver = (observer: AppObjectEntityObserver): void => {
    this.onChangeObserverList.remove(observer);
  };

  /**
   * Notifies all change observers that this entity's state has changed
   * This should be called by derived classes when their state changes
   */
  notifyOnChange = () => {
    this.onChangeObserverList.notify();
  };

  /**
   * Cleans up resources and notifies dispose observers
   * 
   * This method:
   * 1. Removes the change observer from the parent AppObject
   * 2. Notifies all dispose observers
   * 3. Clears all observer lists
   * 4. Calls the parent class dispose method
   */
  dispose() {
    this.removeChangeObserver(this.appObject.notify);

    this.onDisposeObserverList.notify();
    this.onChangeObserverList.clear();
    this.onDisposeObserverList.clear();

    super.dispose();
  }

  /**
   * Creates a new entity component and attaches it to the specified AppObject
   * Automatically adds the AppObject's notify method as a change observer
   * 
   * @param appObject The parent AppObject this component will be attached to
   * @param type The unique type identifier for this component
   */
  constructor(appObject: AppObject, type: string) {
    super(appObject, type)
    
    // When this entity changes, notify the parent AppObject
    this.addChangeObserver(appObject.notify);
  }
}
