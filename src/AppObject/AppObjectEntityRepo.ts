import { ObserverList } from "../Entities";
import { AppObjectEntity } from "./AppObjectEntity";

/**
 * A repository for managing collections of AppObjectEntity instances.
 *
 * This generic class provides a centralized way to store, retrieve, and manage
 * entities that are associated with specific AppObjects. It implements the observer
 * pattern to notify listeners when entities are added or removed.
 *
 * @template T - The type of entities managed by this repository, must extend AppObjectEntity
 * @extends AppObjectEntity
 *
 * @example
 * ```typescript
 * // Create a repository for player entities
 * const playerRepo = new AppObjectEntityRepo<PlayerEntity>();
 *
 * // Add a new player
 * const player = new PlayerEntity(appObject);
 * playerRepo.add(player);
 *
 * // Get a player by its AppObject ID
 * const retrievedPlayer = playerRepo.getForAppObject("player1");
 * ```
 */
export class AppObjectEntityRepo<
  T extends AppObjectEntity,
> extends AppObjectEntity {
  private entityLookup = new Map<string, T>();

  private onEntityAddedObservers = new ObserverList<T>();
  /**
   * Registers an observer to be notified when an entity is added to the repository.
   *
   * @param {(addedEntity: T) => void} observer - The callback function to invoke when an entity is added
   */
  addEntityAddedObserver = (observer: (addedEntity: T) => void) => {
    this.onEntityAddedObservers.add(observer);
  };

  /**
   * Removes an observer previously registered for entity addition notifications.
   *
   * @param {(addedEntity: T) => void} observer - The callback function to remove
   */
  removeEntityAddedObserver = (observer: (addedEntity: T) => void): void => {
    this.onEntityAddedObservers.remove(observer);
  };

  private onEntityRemovedObservers = new ObserverList<T>();
  /**
   * Registers an observer to be notified when an entity is removed from the repository.
   *
   * @param {(removedEntity: T) => void} observer - The callback function to invoke when an entity is removed
   */
  addEntityRemovedObserver = (observer: (removedEntity: T) => void) => {
    this.onEntityRemovedObservers.add(observer);
  };

  /**
   * Removes an observer previously registered for entity removal notifications.
   *
   * @param {(removedEntity: T) => void} observer - The callback function to remove
   */
  removeEntityRemovedObserver = (
    observer: (removedEntity: T) => void
  ): void => {
    this.onEntityRemovedObservers.remove(observer);
  };

  /**
   * Checks if an entity exists for the given AppObject ID.
   *
   * @param {string} appObjectID - The ID of the AppObject
   * @returns {boolean} True if an entity exists for the given AppObject ID, false otherwise
   */
  hasForAppObject = (appObjectID: string): boolean => {
    return this.entityLookup.has(appObjectID);
  };

  /**
   * Adds an entity to the repository.
   *
   * If an entity with the same AppObject ID already exists, it is replaced.
   * Notifies all registered observers after the entity is added.
   *
   * @param {T} entity - The entity to add
   */
  add(entity: T) {
    const existing = this.entityLookup.get(entity.appObject.id);
    if (existing) {
      existing.removeChangeObserver(this.notifyOnChange);
    }

    this.entityLookup.set(entity.appObject.id, entity);
    entity.addChangeObserver(this.notifyOnChange);
    this.notifyOnChange();
    this.onEntityAddedObservers.notify(entity);
  }

  /**
   * Removes the entity associated with the specified AppObject ID.
   *
   * Notifies all registered observers after the entity is removed.
   *
   * @param {string} id - The ID of the AppObject whose entity should be removed
   */
  removeForAppObject = (id: string) => {
    const existing = this.entityLookup.get(id);
    if (!existing) return;

    this.entityLookup.delete(id);
    existing.removeChangeObserver(this.notifyOnChange);
    this.notifyOnChange();
    this.onEntityRemovedObservers.notify(existing);
  };

  /**
   * Gets the entity associated with the specified AppObject ID.
   *
   * @param {string} appObjectID - The ID of the AppObject
   * @returns {T | undefined} The entity if found, undefined otherwise
   */
  getForAppObject = (appObjectID: string): T | undefined => {
    return this.entityLookup.get(appObjectID);
  };

  /**
   * Gets all entities in the repository.
   *
   * @returns {T[]} An array of all entities
   */
  getAll = (): T[] => {
    return Array.from(this.entityLookup.values());
  };
}
