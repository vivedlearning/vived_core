/**
 * EditExampleStringUC.ts
 * 
 * This file demonstrates how to implement a Use Case (UC) component.
 * UCs handle business logic and operations that modify entities.
 * They encapsulate specific actions that can be performed in the application.
 * 
 * Key concepts:
 * - UCs extend AppObjectUC and provide methods for specific operations
 * - They implement business logic for modifying entities
 * - They validate inputs and handle errors
 * - Each UC instance is associated with a specific AppObject
 * 
 * Usage pattern:
 * 1. Get a UC instance using getById or get
 * 2. Call the UC's methods to perform operations
 * 3. The UC will update entities, which will trigger PM updates and UI refreshes
 */

import { AppObject, AppObjectRepo, AppObjectUC } from "../../AppObject";
import { ExampleEntity } from "../Entities/ExampleEntity";

/**
 * EditExampleStringUC provides functionality to update the string property of an ExampleEntity.
 * Abstract class provides the interface and static helper methods.
 */
export abstract class EditExampleStringUC extends AppObjectUC {
  /** Unique type identifier for this component */
  static readonly type = "EditExampleStringUCType";

  /**
   * Updates the string property of the associated ExampleEntity
   * @param text The new string value to set
   */
  abstract editExampleString(text: string): void;

  /**
   * Retrieves an EditExampleStringUC component from an AppObject
   * @param appObj The AppObject to get the component from
   * @returns The EditExampleStringUC component or undefined if not found
   */
  static get(appObj: AppObject): EditExampleStringUC | undefined {
    return appObj.getComponent<EditExampleStringUC>(this.type);
  }

  /**
   * Retrieves an EditExampleStringUC by its parent AppObject's ID
   * @param id The ID of the parent AppObject
   * @param appObjects The AppObjectRepo to search in
   * @returns The EditExampleStringUC component or undefined if not found
   */
  static getById(
    id: string,
    appObjects: AppObjectRepo
  ): EditExampleStringUC | undefined {
    return appObjects.get(id)?.getComponent<EditExampleStringUC>(this.type);
  }
}

/**
 * Factory function to create a new EditExampleStringUC
 * @param appObject The AppObject to attach the UC to
 * @returns A new EditExampleStringUC instance
 */
export function makeEditSlideTextUC(appObject: AppObject): EditExampleStringUC {
  return new EditSlideTextUCImp(appObject);
}

/**
 * Concrete implementation of EditExampleStringUC
 * This private class handles the actual implementation details
 */
class EditSlideTextUCImp extends EditExampleStringUC {
  /**
   * Gets the ExampleEntity from the same AppObject
   * Uses getCachedLocalComponent for efficient repeated access
   */
  private get exampleEntity() {
    return this.getCachedLocalComponent<ExampleEntity>(ExampleEntity.type);
  }

  /**
   * Implements the editExampleString method to update the entity's string property
   * @param text The new string value to set
   */
  editExampleString = (text: string) => {
    if (!this.exampleEntity) {
      this.warn("Unable to find AppState");
      return;
    }

    // Update the entity property, which will trigger PM updates and UI refreshes
    this.exampleEntity.aStringProperty = text;
  };

  constructor(appObject: AppObject) {
    super(appObject, EditExampleStringUC.type);
  }
}
