import { AppObject } from "./AppObject";
import { AppObjectRepo } from "./AppObjectRepo";

/**
 * Enumeration of the different types of components in the architecture.
 * Each type serves a specific purpose in the application structure.
 */
export enum AppObjectComponentType {
  /** Stores and manages application state */
  ENTITY = "Entity",
  
  /** Transforms application state into view models */
  PM = "Presentation Manager",
  
  /** Implements business logic and coordinates between layers */
  UC = "Use Case",
  
  /** Handles user inputs and external events */
  CONTROLLER = "Controller",
  
  /** Renders UI elements and interacts with the DOM/rendering system */
  VIEW = "View",
  
  /** Default type for components that don't fit the standard categories */
  UNKNOWN = "Unknown",
}

/**
 * Base class for all components in the AppObject architecture.
 * 
 * Components attach to AppObjects and provide specific functionality based on their type.
 * The architecture follows a clean separation of concerns, with each component type
 * having a well-defined responsibility in the application.
 * 
 * Components can communicate with each other through various mechanisms:
 * - Direct access via parent AppObject
 * - Repository-level singleton access
 * - Observer patterns for reactive updates
 */
export class AppObjectComponent {
  /** The type category of this component */
  readonly componentType: AppObjectComponentType = AppObjectComponentType.UNKNOWN;
  
  /** Unique type identifier for this specific component */
  readonly type: string;
  
  /** The parent AppObject this component is attached to */
  readonly appObject: AppObject;
  
  /**
   * Convenience accessor for the repository containing all AppObjects
   * @returns The application's AppObjectRepo
   */
  get appObjects(): AppObjectRepo {
    return this.appObject.appObjectRepo;
  }

  /** Cache for components to avoid repeated lookups */
  private cachedComponents = new Map<string, AppObjectComponent>();
  
  /**
   * Retrieves a singleton component of the specified type from the repository
   * Results are cached for better performance in repeated calls
   * 
   * @param type The component type identifier to look up
   * @returns The singleton component cast to type T, or undefined if not found
   */
  getCachedSingleton<T extends AppObjectComponent>(
    type: string
  ): T | undefined {
    if (!this.cachedComponents.has(type)) {
      const component = this.appObjects.getSingleton(type);
      if (!component) {
        this.warn("Unable to get cached singleton type " + type);
      } else {
        this.cachedComponents.set(type, component);
      }
    }

    return this.cachedComponents.get(type) as T;
  }

  /**
   * Retrieves a component from the same AppObject as this component
   * Results are cached for better performance in repeated calls
   * 
   * @param type The component type identifier to look up
   * @returns The component cast to type T, or undefined if not found
   */
  getCachedLocalComponent<T extends AppObjectComponent>(
    type: string
  ): T | undefined {
    if (!this.cachedComponents.has(type)) {
      const component = this.appObject.getComponent(type);

      if (!component) {
        this.warn("Unable to get local component of type " + type);
      } else {
        this.cachedComponents.set(type, component);
      }
    }

    return this.cachedComponents.get(type) as T;
  }

  /**
   * Retrieves a singleton component from the repository with customizable logging
   * Unlike getCachedSingleton, results are not cached
   * 
   * @param type The component type identifier to look up
   * @param logType The severity level for logging if component isn't found
   * @returns The singleton component cast to type T, or undefined if not found
   */
  getSingleton<T extends AppObjectComponent>(
    type: string,
    logType: "LOG" | "WARN" | "ERROR" = "WARN"
  ): T | undefined {
    const comp = this.appObjects.getSingleton<T>(type);

    if (!comp) {
      const msg = "Unable to get singleton type " + type;
      switch (logType) {
        case "ERROR":
          this.error(msg);
          break;
        case "LOG":
          this.log(msg);
          break;
        case "WARN":
          this.warn(msg);
          break;
      }
    }

    return comp;
  }

  /**
   * Cleans up resources used by this component
   * Removes itself from the parent AppObject if it's still attached
   */
  dispose() {
    if (this.appObject.getComponent(this.type) === this) {
      this.appObject.removeComponent(this.type);
    }
  }

  /**
   * Logs an informational message to the application's logging system
   * Messages are prefixed with the AppObject ID and component type for easier debugging
   * 
   * @param message The message to log
   */
  log(message: string) {
    this.appObjects.submitLog(`${this.appObject.id}/${this.type}`, message);
  }

  /**
   * Logs a warning message to the application's logging system
   * Messages are prefixed with the AppObject ID and component type for easier debugging
   * 
   * @param message The warning message to log
   */
  warn(message: string) {
    this.appObjects.submitWarning(`${this.appObject.id}/${this.type}`, message);
  }

  /**
   * Logs an error message to the application's logging system
   * Messages are prefixed with the AppObject ID and component type for easier debugging
   * 
   * @param message The error message to log
   */
  error(message: string) {
    this.appObjects.submitError(`${this.appObject.id}/${this.type}`, message);
  }

  /**
   * Creates a new component and attaches it to the specified AppObject
   * 
   * @param appObject The parent AppObject this component will be attached to
   * @param type The unique type identifier for this component
   */
  constructor(appObject: AppObject, type: string) {
    this.appObject = appObject;
    this.type = type;
    appObject.addComponent(this);
  }
}
