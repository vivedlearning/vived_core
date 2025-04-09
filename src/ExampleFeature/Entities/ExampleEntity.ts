/**
 * ExampleEntity.ts
 * 
 * This file demonstrates how to implement a standard (non-singleton) entity in the application.
 * Entities store and manage data, track state changes, and notify observers when changes occur.
 * 
 * Key concepts:
 * - Entity classes extend AppObjectEntity
 * - They provide access to data properties
 * - They use Memoized types (MemoizedString, MemoizedBoolean, etc.) to track changes
 * - They notify observers when properties change
 * 
 * Usage pattern:
 * 1. Get or create an entity instance using getById, get, or addIfMissing
 * 2. Access or modify properties via getters/setters
 * 3. Register change observers to react to property updates
 */

import {
  AppObject,
  AppObjectEntity,
  AppObjectRepo
} from "../../AppObject";
import { MemoizedString } from "../../Entities/MemoizedString";

/**
 * ExampleEntity represents a basic entity with a string property.
 * Abstract class provides the interface and static helper methods.
 */
export abstract class ExampleEntity extends AppObjectEntity {
  /** Unique type identifier for this component */
  static readonly type = "ExampleEntityType";

  /** String property accessor methods that must be implemented */
  abstract get aStringProperty(): string;
  abstract set aStringProperty(val: string);

  /**
   * Retrieves an ExampleEntity component from an AppObject
   * @param appObj The AppObject to get the component from
   * @returns The ExampleEntity component or undefined if not found
   */
  static get(appObj: AppObject): ExampleEntity | undefined {
    return appObj.getComponent<ExampleEntity>(this.type);
  }

  /**
   * Retrieves an ExampleEntity by its parent AppObject's ID
   * @param id The ID of the parent AppObject
   * @param appObjects The AppObjectRepo to search in
   * @returns The ExampleEntity component or undefined if not found
   */
  static getById(
    id: string,
    appObjects: AppObjectRepo
  ): ExampleEntity | undefined {
    return appObjects.get(id)?.getComponent<ExampleEntity>(this.type);
  }

  /**
   * Ensures an ExampleEntity exists on the AppObject, creating one if needed
   * @param appObj The AppObject to check/add the component to
   * @returns The existing or newly created ExampleEntity
   */
  static addIfMissing(appObj: AppObject): ExampleEntity {
    const existing = appObj.getComponent<ExampleEntity>(this.type);
    if (existing) {
      return existing;
    } else {
      return makeExampleEntity(appObj);
    }
  }
}

/**
 * Factory function to create a new ExampleEntity
 * @param appObject The AppObject to attach the entity to
 * @returns A new ExampleEntity instance
 */
export function makeExampleEntity(
  appObject: AppObject
): ExampleEntity {
  return new ExampleEntityImp(appObject);
}

/**
 * Concrete implementation of ExampleEntity
 * This private class handles the actual implementation details
 */
class ExampleEntityImp extends ExampleEntity {
  // MemoizedString tracks changes to the string value and calls notifyOnChange when updated
  private memoizedIsAuthoring = new MemoizedString("", this.notifyOnChange);
  
  // Property accessors that use the memoized value
  get aStringProperty() {
    return this.memoizedIsAuthoring.val;
  }
  
  set aStringProperty(val: string) {
    this.memoizedIsAuthoring.val = val;
  }

  constructor(appObject: AppObject) {
    super(appObject, ExampleEntity.type);
  }
}
