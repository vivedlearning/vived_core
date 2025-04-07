import { ObservableEntity } from "../Entities";
import { AppObjectComponent } from "./AppObjectComponent";
import { AppObjectRepo } from "./AppObjectRepo";

/**
 * AppObject is the central class in the VIVED application architecture.
 * It serves as a container for components that implement the application's functionality.
 * Each AppObject is identified by a unique ID and registered with an AppObjectRepo.
 * 
 * AppObjects are observable entities that notify observers when their components change.
 * This enables reactive programming patterns throughout the application.
 */
export abstract class AppObject extends ObservableEntity {
  /** Unique identifier for this AppObject */
  abstract readonly id: string;
  
  /** Repository that manages this AppObject */
  abstract readonly appObjectRepo: AppObjectRepo;

  /**
   * Checks if this AppObject has a component of the specified type
   * @param type The component type identifier
   * @returns True if the component exists, false otherwise
   */
  abstract hasComponent(type: string): boolean;
  
  /**
   * Adds a component to this AppObject
   * If a component of the same type already exists, it will be replaced
   * @param component The component to add
   */
  abstract addComponent(component: AppObjectComponent): void;
  
  /**
   * Retrieves a component by type
   * @param type The component type identifier
   * @returns The component cast to type T, or undefined if not found
   */
  abstract getComponent<T extends AppObjectComponent>(type: string): T | undefined;
  
  /**
   * Removes a component by type
   * @param type The component type identifier
   */
  abstract removeComponent(type: string): void;
  
  /**
   * Gets all components attached to this AppObject
   * @returns Array of all components
   */
  abstract allComponents(): AppObjectComponent[];

  /**
   * Cleans up resources and removes this AppObject from its repository
   */
  abstract dispose(): void;
}

/**
 * Factory function to create a new AppObject
 * @param id Unique identifier for the new AppObject
 * @param repo Repository to register the AppObject with
 * @returns A new AppObject instance
 */
export function makeAppObject(id: string, repo: AppObjectRepo): AppObject {
  return new AppObjectImp(id, repo);
}

/**
 * Implementation of the AppObject abstract class
 * This class handles the component management functionality
 */
class AppObjectImp extends AppObject {
  readonly id: string;
  readonly appObjectRepo: AppObjectRepo;

  /** Map of component types to component instances */
  private componentLookup = new Map<string, AppObjectComponent>();

  /**
   * Checks if a component of the specified type exists
   * @param type The component type identifier
   * @returns True if the component exists, false otherwise
   */
  hasComponent(type: string): boolean {
    return this.componentLookup.has(type);
  }

  /**
   * Adds a component to this AppObject
   * If a component of the same type already exists, it will be disposed and replaced
   * Notifies observers after adding the component
   * @param component The component to add
   */
  addComponent(component: AppObjectComponent): void {
    const currentComponent = this.componentLookup.get(component.type);
    if (currentComponent) {
      console.warn(
        `[AppObject] Component ${component.type} is being replaced on ${this.id}`
      );
      currentComponent.dispose();
    }

    this.componentLookup.set(component.type, component);
    this.notify();
  }

  /**
   * Retrieves a component by type
   * @param type The component type identifier
   * @returns The component cast to type T, or undefined if not found
   */
  getComponent<T extends AppObjectComponent>(type: string): T | undefined {
    if (this.componentLookup.has(type)) {
      return this.componentLookup.get(type) as T;
    } else {
      return undefined;
    }
  }

  /**
   * Removes a component by type and notifies observers
   * @param type The component type identifier
   */
  removeComponent(type: string): void {
    const component = this.componentLookup.get(type);

    if (!component) return;

    this.componentLookup.delete(type);
    this.notify();
  }

  /**
   * Gets all components attached to this AppObject
   * @returns Array of all components
   */
  allComponents(): AppObjectComponent[] {
    return Array.from(this.componentLookup.values());
  }

  /**
   * Cleans up resources by:
   * 1. Disposing all attached components
   * 2. Removing this AppObject from its repository
   */
  dispose = (): void => {
    const components = Array.from(this.componentLookup.values());
    this.componentLookup.clear();
    components.forEach(c => c.dispose());

    if (this.appObjectRepo.has(this.id)) {
      this.appObjectRepo.remove(this.id);
    }
  };

  /**
   * Creates a new AppObject instance
   * @param id Unique identifier for this AppObject
   * @param repo Repository to register with
   */
  constructor(id: string, repo: AppObjectRepo) {
    super();
    this.id = id;
    this.appObjectRepo = repo;
    this.appObjectRepo.add(this);
  }
}
