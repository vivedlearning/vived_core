/**
 * ToggleExampleBooleanUC.ts
 * 
 * This file demonstrates how to implement a Singleton Use Case (UC) component.
 * Singleton UCs are special UCs that exist only once in the application and can be
 * accessed globally. They handle business logic and operations that modify singleton entities.
 * 
 * Key concepts:
 * - Singleton UCs extend AppObjectUC like regular UCs
 * - They register themselves as singletons with appObjects.registerSingleton()
 * - They're accessed through a static get() method using getSingletonComponent()
 * - They typically operate on singleton entities
 * 
 * Usage pattern:
 * 1. Access the singleton UC using the static get() method
 * 2. Call the UC's methods to perform operations
 * 3. The UC will update entities, which will trigger PM updates and UI refreshes
 */

import {
  AppObject,
  AppObjectRepo,
  AppObjectUC
} from "../../AppObject";
import { getSingletonComponent } from "../../AppObject/getSingletonComponent";
import { SingletonEntityExample } from "../Entities/ExampleSingletonEntity";

/**
 * ToggleExampleBooleanUC provides functionality to toggle the boolean property
 * of the SingletonEntityExample. As a singleton, only one instance exists in the application.
 */
export abstract class ToggleExampleBooleanUC extends AppObjectUC {
  /** Unique type identifier for this component */
  static readonly type = "ToggleExampleBooleanUCType";

  /**
   * Toggles the boolean property of the SingletonEntityExample
   */
  abstract toggleExampleBoolean(): void;

  /**
   * Global accessor for the singleton UC
   * @param appObjects The AppObjectRepo to search in
   * @returns The singleton UC or undefined if not created yet
   */
  static get = (
    appObjects: AppObjectRepo
  ): ToggleExampleBooleanUC | undefined =>
    getSingletonComponent(ToggleExampleBooleanUC.type, appObjects);
}

/**
 * Factory function to create a new ToggleExampleBooleanUC
 * @param appObject The AppObject to attach the UC to
 * @returns A new ToggleExampleBooleanUC instance
 */
export function makeToggleExampleBooleanUC(
  appObject: AppObject
): ToggleExampleBooleanUC {
  return new ToggleExampleBooleanUCImp(appObject);
}

/**
 * Concrete implementation of ToggleExampleBooleanUC
 * This private class handles the actual implementation details
 */
class ToggleExampleBooleanUCImp extends ToggleExampleBooleanUC {
  /**
   * Gets the SingletonEntityExample from the application
   * Uses getCachedSingleton for efficient repeated access
   */
  private get singletonEntityExample() {
    return this.getCachedSingleton<SingletonEntityExample>(
      SingletonEntityExample.type
    );
  }

  /**
   * Implements the toggleExampleBoolean method to invert the entity's boolean property
   */
  toggleExampleBoolean = () => {
    if (!this.singletonEntityExample) {
      this.warn("Unable to find SingletonEntityExample");
      return;
    }

    // Toggle the boolean property by inverting its current value
    this.singletonEntityExample.aBoolProperty =
      !this.singletonEntityExample?.aBoolProperty;
  };

  constructor(appObject: AppObject) {
    super(appObject, ToggleExampleBooleanUC.type);
    // Register this UC as a singleton so it can be accessed globally
    this.appObjects.registerSingleton(this);
  }
}
