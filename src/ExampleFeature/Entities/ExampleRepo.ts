/**
 * ExampleRepo.ts
 * 
 * This file demonstrates how to implement a repository to manage collections of entities.
 * Repositories are responsible for creating, retrieving, and deleting entities.
 * 
 * Key concepts:
 * - Repositories extend AppObjectEntityRepo<T> where T is the entity type
 * - They provide methods to create and delete entities
 * - They manage collections of entities and provide access to them
 * - They can use custom entity factories to create specialized entities
 * 
 * Usage pattern:
 * 1. Get or create a repository using getById, get, or addIfMissing
 * 2. Use the repository to create new entities
 * 3. Access entities through the repository's getters
 * 4. Delete entities through the repository when they're no longer needed
 */

import {
  AppObject,
  AppObjectEntityRepo,
  AppObjectRepo
} from "../../AppObject";
import { generateUniqueID } from "../../Utilities/generateUniqueID";
import { ExampleEntity, makeExampleEntity } from "./ExampleEntity";

/** Type definition for a factory function that creates ExampleEntity instances */
export type ExampleEntityFactory = (id: string) => ExampleEntity;

/**
 * ExampleRepo manages a collection of ExampleEntity instances.
 * Abstract class provides the interface and static helper methods.
 */
export abstract class ExampleRepo extends AppObjectEntityRepo<ExampleEntity> {
  /** Unique type identifier for this component */
  static readonly type = "ExampleRepoType";

  /** Factory function used to create new entities */
  abstract exampleEntityFactory: ExampleEntityFactory;

  /** Creates a new entity with an optional ID */
  abstract createExampleEntity(id?: string): ExampleEntity;
  
  /** Deletes an entity by its AppObject ID */
  abstract deleteExampleEntity(id: string): void;

  /**
   * Retrieves an ExampleRepo component from an AppObject
   * @param appObj The AppObject to get the component from
   * @returns The ExampleRepo component or undefined if not found
   */
  static get(appObj: AppObject): ExampleRepo | undefined {
    return appObj.getComponent<ExampleRepo>(this.type);
  }

  /**
   * Retrieves an ExampleRepo by its parent AppObject's ID
   * @param id The ID of the parent AppObject
   * @param appObjects The AppObjectRepo to search in
   * @returns The ExampleRepo component or undefined if not found
   */
  static getById(
    id: string,
    appObjects: AppObjectRepo
  ): ExampleRepo | undefined {
    return appObjects.get(id)?.getComponent<ExampleRepo>(this.type);
  }

  /**
   * Ensures an ExampleRepo exists on the AppObject, creating one if needed
   * @param appObject The AppObject to check/add the component to
   * @returns The existing or newly created ExampleRepo
   */
  static addIfMissing(appObject: AppObject): ExampleRepo {
    const existing = appObject.getComponent<ExampleRepo>(ExampleRepo.type);
    if (existing) {
      return existing;
    } else {
      return makeExampleRepo(appObject);
    }
  }
}

/**
 * Factory function to create a new ExampleRepo
 * @param appObject The AppObject to attach the repo to
 * @returns A new ExampleRepo instance
 */
export function makeExampleRepo(appObject: AppObject): ExampleRepo {
  return new ExampleRepoImp(appObject);
}

/**
 * Concrete implementation of ExampleRepo
 * This private class handles the actual implementation details
 */
class ExampleRepoImp extends ExampleRepo {
  /**
   * Creates a new ExampleEntity and adds it to the repository
   * @param id Optional ID for the entity's AppObject (generates one if not provided)
   * @returns The newly created ExampleEntity
   */
  createExampleEntity = (id: string | undefined): ExampleEntity => {
    const idToUse = id ?? generateUniqueID();
    const entity = this.exampleEntityFactory(idToUse);
    this.add(entity);
    return entity;
  };

  /**
   * Deletes an ExampleEntity from the repository by its AppObject ID
   * @param id The ID of the entity's AppObject
   */
  deleteExampleEntity(id: string): void {
    const entity = this.getForAppObject(id);
    if (!entity) return;

    entity.appObject.dispose();
    this.removeForAppObject(id);
  }

  /**
   * Default factory implementation for creating ExampleEntity instances
   * Can be overridden to create specialized entities
   */
  exampleEntityFactory = (id: string): ExampleEntity => {
    const ao = this.appObjects.getOrCreate(id);
    return makeExampleEntity(ao);
  };

  constructor(appObject: AppObject) {
    super(appObject, ExampleRepo.type);
  }
}
