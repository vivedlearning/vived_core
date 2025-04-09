/**
 * ExamplePM.ts
 * 
 * This file demonstrates how to implement a Presentation Manager (PM) component.
 * PMs are responsible for transforming entity data into view models (VMs) for the UI.
 * They observe entities for changes and update their views when data changes.
 * 
 * Key concepts:
 * - PMs extend AppObjectPM<VM> where VM is the view model type
 * - They observe entities and transform entity data into view models
 * - They notify UI components (views) when view models change
 * - Each PM instance is associated with a specific AppObject
 * 
 * Usage pattern:
 * 1. Get a PM instance using getById
 * 2. Register UI components as views using addView(callback)
 * 3. PM will call the view callbacks with updated view models when entities change
 * 4. Remove UI components with removeView(callback) when they're unmounted
 */

import { AppObject, AppObjectPM, AppObjectRepo } from "../../AppObject";
import { ExampleEntity } from "../Entities/ExampleEntity";

/**
 * ExamplePM transforms ExampleEntity data into a simple string view model.
 * Abstract class provides the interface and static helper methods.
 */
export abstract class ExamplePM extends AppObjectPM<string> {
  /** Unique type identifier for this component */
  static readonly type = "ExamplePMType";

  /**
   * Retrieves an ExamplePM by its parent AppObject's ID
   * @param id The ID of the parent AppObject
   * @param appObjects The AppObjectRepo to search in
   * @returns The ExamplePM component or undefined if not found
   */
  static getById(id: string, appObjects: AppObjectRepo) {
    return appObjects.get(id)?.getComponent<ExamplePM>(ExamplePM.type);
  }
}

/**
 * Factory function to create a new ExamplePM
 * @param appObject The AppObject to attach the PM to
 * @returns A new ExamplePM instance
 */
export function makeExamplePM(appObject: AppObject): ExamplePM {
  return new ExamplePMImp(appObject);
}

/**
 * Concrete implementation of ExamplePM
 * This private class handles the actual implementation details
 */
class ExamplePMImp extends ExamplePM {
  /**
   * Gets the ExampleEntity from the same AppObject
   * Uses getCachedLocalComponent for efficient repeated access
   */
  private get exampleEntity() {
    return this.getCachedLocalComponent<ExampleEntity>(ExampleEntity.type);
  }

  /**
   * Compares two view models to determine if they're equal
   * Used to avoid unnecessary view updates when values haven't changed
   */
  vmsAreEqual(a: string, b: string): boolean {
    return a === b;
  }

  /**
   * Handler for entity change events
   * Transforms entity data into a view model and updates views
   */
  onEntityChange = () => {
    if (!this.exampleEntity) return;

    // In this simple case, our view model is just the string property value
    this.doUpdateView(this.exampleEntity.aStringProperty);
  };

  /**
   * Cleanup method called when the PM is being disposed
   * Removes any observers to prevent memory leaks
   */
  dispose = (): void => {
    super.dispose();
    this.exampleEntity?.removeChangeObserver(this.onEntityChange);
  };

  constructor(appObject: AppObject) {
    super(appObject, ExamplePM.type);

    // Register as an observer of the entity to receive change notifications
    this.exampleEntity?.addChangeObserver(this.onEntityChange);
    
    // Call the change handler initially to set up the initial view model
    this.onEntityChange();
  }
}
