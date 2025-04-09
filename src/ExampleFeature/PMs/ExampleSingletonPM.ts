/**
 * ExampleSingletonPM.ts
 * 
 * This file demonstrates how to implement a Singleton Presentation Manager (PM).
 * Singleton PMs are special PMs that exist only once in the application and can be
 * accessed globally. They transform data from singleton entities into view models.
 * 
 * Key concepts:
 * - Singleton PMs extend AppObjectPM<VM> like regular PMs
 * - They register themselves as singletons with appObjects.registerSingleton()
 * - They're accessed through a static get() method using getSingletonComponent()
 * - They typically observe singleton entities and provide data to multiple UI components
 * 
 * Usage pattern:
 * 1. Access the singleton PM using the static get() method
 * 2. Register UI components as views using addView(callback)
 * 3. PM will call the view callbacks with updated view models when entities change
 * 4. Remove UI components with removeView(callback) when they're unmounted
 */

import {
  AppObject,
  AppObjectPM,
  AppObjectRepo,
} from "../../AppObject";
import { getSingletonComponent } from "../../AppObject/getSingletonComponent";
import { SingletonEntityExample } from "../Entities/ExampleSingletonEntity";

/**
 * Interface defining the structure of the view model provided by ExampleSingletonPM
 */
export interface ExampleVM {
  aBoolProperty: boolean;
}

/**
 * ExampleSingletonPM transforms SingletonEntityExample data into an ExampleVM.
 * As a singleton, only one instance exists in the application.
 */
export abstract class ExampleSingletonPM extends AppObjectPM<ExampleVM> {
  /** Unique type identifier for this component */
  static readonly type = "ExampleSingletonPMType";

  /**
   * Global accessor for the singleton PM
   * @param appObjects The AppObjectRepo to search in
   * @returns The singleton PM or undefined if not created yet
   */
  static get = (appObjects: AppObjectRepo): ExampleSingletonPM | undefined =>
    getSingletonComponent(ExampleSingletonPM.type, appObjects);
}

/**
 * Default view model used when no data is available
 * UI components can use this initially or when the PM is not found
 */
export const defaultSlideNavigationVM: ExampleVM = {
  aBoolProperty: true
};

/**
 * Factory function to create a new ExampleSingletonPM
 * @param appObject The AppObject to attach the PM to
 * @returns A new ExampleSingletonPM instance
 */
export function makeExampleSingletonPM(
  appObject: AppObject
): ExampleSingletonPM {
  return new ExampleSingletonPMImp(appObject);
}

/**
 * Concrete implementation of ExampleSingletonPM
 * This private class handles the actual implementation details
 */
class ExampleSingletonPMImp extends ExampleSingletonPM {
  /**
   * Gets the SingletonEntityExample from the application
   * Uses getCachedSingleton for efficient repeated access
   */
  private get exampleEntity() {
    return this.getCachedSingleton<SingletonEntityExample>(
      SingletonEntityExample.type
    );
  }

  /**
   * Handler for entity change events
   * Transforms entity data into a view model and updates views
   */
  onEntityChange = () => {
    if (!this.exampleEntity) return;

    // Extract the boolean property from the entity
    const aBoolProperty = this.exampleEntity.aBoolProperty;

    // Create a view model with the extracted data
    const vm = { aBoolProperty };

    // Update all registered views with the new view model
    this.doUpdateView(vm);
  };

  /**
   * Compares two view models to determine if they're equal
   * Used to avoid unnecessary view updates when values haven't changed
   */
  vmsAreEqual(a: ExampleVM, b: ExampleVM): boolean {
    if (a.aBoolProperty !== b.aBoolProperty) return false;
    return true;
  }

  constructor(appObject: AppObject) {
    super(appObject, ExampleSingletonPM.type);

    // Register as an observer of the entity to receive change notifications
    this.exampleEntity?.addChangeObserver(this.onEntityChange);
    
    // Call the change handler initially to set up the initial view model
    this.onEntityChange();
    
    // Register this PM as a singleton so it can be accessed globally
    this.appObjects.registerSingleton(this);
  }
}
