import { ObservableEntity, ObserverList } from "../Entities";
import { AppObject, makeAppObject } from "./AppObject";
import { AppObjectComponent } from "./AppObjectComponent";

/**
 * Abstract repository class for managing AppObjects and their components.
 *
 * This class provides the interface for storing, retrieving, and managing application
 * objects, their components, and singletons. It also includes logging functionality
 * and observer pattern implementation for tracking changes to the repository.
 *
 * @extends ObservableEntity
 */
export abstract class AppObjectRepo extends ObservableEntity {
  /**
   * Checks if an AppObject with the specified ID exists in the repository.
   *
   * @param {string} appObjectID - The ID of the AppObject to check
   * @returns {boolean} True if the AppObject exists, false otherwise
   */
  abstract has(appObjectID: string): boolean;

  /**
   * Adds an AppObject to the repository.
   *
   * @param {AppObject} appObject - The AppObject to add
   */
  abstract add(appObject: AppObject): void;

  /**
   * Removes an AppObject with the specified ID from the repository.
   *
   * @param {string} appObjectID - The ID of the AppObject to remove
   */
  abstract remove(appObjectID: string): void;

  /**
   * Gets an AppObject by its ID.
   *
   * @param {string} appObjectID - The ID of the AppObject to retrieve
   * @returns {AppObject | undefined} The AppObject if found, undefined otherwise
   */
  abstract get(appObjectID: string): AppObject | undefined;

  /**
   * Gets an AppObject by its ID, or creates a new one if it doesn't exist.
   *
   * @param {string} appObjectID - The ID of the AppObject to retrieve or create
   * @returns {AppObject} The existing or newly created AppObject
   */
  abstract getOrCreate(appObjectID: string): AppObject;

  /**
   * Gets all AppObjects in the repository.
   *
   * @returns {AppObject[]} An array of all AppObjects
   */
  abstract getAll(): AppObject[];

  /**
   * Logs an informational message.
   *
   * @param {string} sender - The identifier of the message sender
   * @param {string} message - The message to log
   */
  abstract submitLog(sender: string, message: string): void;

  /**
   * Logs a warning message.
   *
   * @param {string} sender - The identifier of the message sender
   * @param {string} message - The warning message to log
   */
  abstract submitWarning(sender: string, message: string): void;

  /**
   * Logs an error message.
   *
   * @param {string} sender - The identifier of the message sender
   * @param {string} message - The error message to log
   */
  abstract submitError(sender: string, message: string): void;

  /**
   * Logs a fatal error message.
   *
   * @param {string} sender - The identifier of the message sender
   * @param {string} message - The fatal error message to log
   */
  abstract submitFatal(sender: string, message: string): void;

  /**
   * Registers a component as a singleton in the repository.
   *
   * @param {AppObjectComponent} component - The component to register as a singleton
   */
  abstract registerSingleton(component: AppObjectComponent): void;

  /**
   * Gets a singleton component of the specified type.
   *
   * @template T - Type of the component to retrieve, must extend AppObjectComponent
   * @param {string} type - The type of the singleton to retrieve
   * @returns {T | undefined} The singleton component if found, undefined otherwise
   */
  abstract getSingleton<T extends AppObjectComponent>(
    type: string
  ): T | undefined;

  /**
   * Gets a component of the specified type from an AppObject.
   *
   * @template T - Type of the component to retrieve, must extend AppObjectComponent
   * @param {string} appObjectID - The ID of the AppObject containing the component
   * @param {string} type - The type of the component to retrieve
   * @returns {T | undefined} The component if found, undefined otherwise
   */
  abstract getAppObjectComponent<T extends AppObjectComponent>(
    appObjectID: string,
    type: string
  ): T | undefined;

  /**
   * Gets all AppObjects that have a component of the specified type.
   *
   * @param {string} componentType - The component type to filter by
   * @returns {AppObject[]} An array of AppObjects having the specified component type
   */
  abstract getAllAppObjectsWithComponent(componentType: string): AppObject[];

  /**
   * Gets all components of the specified type across all AppObjects.
   *
   * @template T - Type of the components to retrieve, must extend AppObjectComponent
   * @param {string} type - The type of components to retrieve
   * @returns {T[]} An array of all components of the specified type
   */
  abstract getAllComponents<T extends AppObjectComponent>(type: string): T[];

  /**
   * Adds an observer to be notified when an AppObject is added to the repository.
   *
   * @param {(addedEntity: AppObject) => void} observer - The observer function
   */
  abstract addAppObjectAddedObserver: (
    observer: (addedEntity: AppObject) => void
  ) => void;

  /**
   * Removes an observer previously registered for AppObject addition notifications.
   *
   * @param {(addedEntity: AppObject) => void} observer - The observer function to remove
   */
  abstract removeAppObjectAddedObserver: (
    observer: (addedEntity: AppObject) => void
  ) => void;

  /**
   * Adds an observer to be notified when an AppObject is removed from the repository.
   *
   * @param {(addedEntity: AppObject) => void} observer - The observer function
   */
  abstract addAppObjectRemovedObserver: (
    observer: (addedEntity: AppObject) => void
  ) => void;

  /**
   * Removes an observer previously registered for AppObject removal notifications.
   *
   * @param {(addedEntity: AppObject) => void} observer - The observer function to remove
   */
  abstract removedAppObjectRemovedObserver: (
    observer: (addedEntity: AppObject) => void
  ) => void;
}

/**
 * Creates and returns a new AppObjectRepo instance.
 *
 * @returns {AppObjectRepo} A new AppObjectRepo instance
 */
export function makeAppObjectRepo(): AppObjectRepo {
  return new AppObjectRepoImp();
}

/**
 * Implementation of the AppObjectRepo abstract class.
 *
 * @private
 * @extends AppObjectRepo
 */
class AppObjectRepoImp extends AppObjectRepo {
  private appObjectLookup = new Map<string, AppObject>();
  private singletons = new Map<string, AppObjectComponent>();

  private onAppObjectAddedObserver = new ObserverList<AppObject>();
  addAppObjectAddedObserver = (observer: (addedEntity: AppObject) => void) => {
    this.onAppObjectAddedObserver.add(observer);
  };
  removeAppObjectAddedObserver = (
    observer: (addedEntity: AppObject) => void
  ): void => {
    this.onAppObjectAddedObserver.remove(observer);
  };

  private onAppObjectRemovedObservers = new ObserverList<AppObject>();
  addAppObjectRemovedObserver = (
    observer: (removedEntity: AppObject) => void
  ) => {
    this.onAppObjectRemovedObservers.add(observer);
  };
  removedAppObjectRemovedObserver = (
    observer: (removedEntity: AppObject) => void
  ): void => {
    this.onAppObjectRemovedObservers.remove(observer);
  };

  has = (id: string): boolean => {
    return this.appObjectLookup.has(id);
  };

  add = (appObject: AppObject) => {
    const existing = this.appObjectLookup.get(appObject.id);
    if (existing) {
      existing.removeObserver(this.notify);
    }

    this.appObjectLookup.set(appObject.id, appObject);
    appObject.addObserver(this.notify);
    this.notify();
    this.onAppObjectAddedObserver.notify(appObject);
  };

  remove = (id: string) => {
    const existing = this.appObjectLookup.get(id);
    if (!existing) return;

    this.appObjectLookup.delete(id);
    existing.removeObserver(this.notify);
    this.notify();
    this.onAppObjectRemovedObservers.notify(existing);
  };

  get = (id: string): AppObject | undefined => {
    return this.appObjectLookup.get(id);
  };

  getOrCreate = (id: string): AppObject => {
    const existing = this.appObjectLookup.get(id);

    if (!existing) {
      return makeAppObject(id, this);
    } else {
      return existing;
    }
  };

  getAll = (): AppObject[] => {
    return Array.from(this.appObjectLookup.values());
  };

  getAllAppObjectsWithComponent(componentType: string): AppObject[] {
    const rArray: AppObject[] = [];

    this.appObjectLookup.forEach((appObj) => {
      if (appObj.hasComponent(componentType)) {
        rArray.push(appObj);
      }
    });

    return rArray;
  }

  getAllComponents<T extends AppObjectComponent>(type: string): T[] {
    const rArray: T[] = [];

    this.appObjectLookup.forEach((appObj) => {
      const aoEntity = appObj.getComponent(type);
      if (aoEntity) {
        rArray.push(aoEntity as T);
      }
    });

    return rArray;
  }

  getAppObjectComponent<T extends AppObjectComponent>(
    id: string,
    entityType: string
  ): T | undefined {
    const ao = this.appObjectLookup.get(id);
    if (!ao) {
      return undefined;
    }

    return ao.getComponent(entityType) as T;
  }

  submitLog(sender: string, message: string): void {
    console.log(`[${sender}]: ${message}`);
  }
  submitWarning(sender: string, message: string): void {
    console.warn(`[${sender}]: ${message}`);
  }
  submitError(sender: string, message: string): void {
    console.error(`[${sender}]: ${message}`);
  }
  submitFatal(sender: string, message: string): void {
    console.error(`FATAL ERROR - [${sender}]: ${message}`);
  }

  registerSingleton(component: AppObjectComponent): void {
    if (this.singletons.has(component.type)) {
      this.submitWarning(
        "AppObjectRepo",
        `Singleton for type ${component.type} already exists. Relpacing`
      );
    }

    this.singletons.set(component.type, component);
  }

  getSingleton<T extends AppObjectComponent>(type: string): T | undefined {
    if (this.singletons.has(type)) {
      return this.singletons.get(type) as T;
    }

    const components = this.getAllComponents<AppObjectComponent>(type);
    if (components.length === 1) {
      this.singletons.set(components[0].type, components[0]);
      return components[0] as T;
    } else if (components.length === 0) {
      this.submitWarning(
        "AppObjectRepo",
        `Unable to find a singleton for ${type}`
      );
      return undefined;
    } else if (components.length > 1) {
      this.submitWarning(
        "AppObjectRepo",
        `Multiple ${type} found. There should only be one if it truly a singleton. Using the first one`
      );
      return components[0] as T;
    }
  }
}
