/**
 * ExampleSingletonEntity.ts
 * 
 * This file demonstrates how to implement a singleton entity in the application.
 * Singleton entities are special entities that exist only once in the application
 * and can be accessed globally from anywhere.
 * 
 * Key concepts:
 * - Singleton entities extend AppObjectEntity like regular entities
 * - They register themselves as singletons with appObjects.registerSingleton()
 * - They're accessed through a static get() method using getSingletonComponent()
 * - There's only one instance of a singleton entity in the entire application
 * 
 * Usage pattern:
 * 1. Access the singleton entity using the static get() method
 * 2. Access or modify properties via getters/setters
 * 3. Register change observers to react to property updates
 */

import {
  AppObject,
  AppObjectEntity,
  AppObjectRepo
} from "../../AppObject";
import { getSingletonComponent } from "../../AppObject/getSingletonComponent";
import { MemoizedBoolean } from "../../Entities/MemoizedBoolean";

/**
 * SingletonEntityExample represents a global entity with a boolean property.
 * As a singleton, only one instance exists in the application.
 */
export abstract class SingletonEntityExample extends AppObjectEntity {
  /** Unique type identifier for this component */
  static readonly type = "SingletonEntityExampleType";

  /** Boolean property accessor methods that must be implemented */
  abstract get aBoolProperty(): boolean;
  abstract set aBoolProperty(val: boolean);

  /**
   * Global accessor for the singleton entity
   * @param appObjects The AppObjectRepo to search in
   * @returns The singleton entity or undefined if not created yet
   */
  static get = (
    appObjects: AppObjectRepo
  ): SingletonEntityExample | undefined =>
    getSingletonComponent(SingletonEntityExample.type, appObjects);
}

/**
 * Factory function to create a new SingletonEntityExample
 * @param appObject The AppObject to attach the entity to
 * @returns A new SingletonEntityExample instance
 */
export function makeSingletonEntityExample(
  appObject: AppObject
): SingletonEntityExample {
  return new SingletonEntityExampleImp(appObject);
}

/**
 * Concrete implementation of SingletonEntityExample
 * This private class handles the actual implementation details
 */
class SingletonEntityExampleImp extends SingletonEntityExample {
  // MemoizedBoolean tracks changes to the boolean value and calls notifyOnChange when updated
  private memoizedIsAuthoring = new MemoizedBoolean(false, this.notifyOnChange);
  
  // Property accessors that use the memoized value
  get aBoolProperty() {
    return this.memoizedIsAuthoring.val;
  }
  
  set aBoolProperty(val: boolean) {
    this.memoizedIsAuthoring.val = val;
  }

  constructor(appObject: AppObject) {
    super(appObject, SingletonEntityExample.type);
    // Register this entity as a singleton so it can be accessed globally
    this.appObjects.registerSingleton(this);
  }
}
