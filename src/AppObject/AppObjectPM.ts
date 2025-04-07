import { ObserverList } from "../Entities";
import { AppObjectComponent, AppObjectComponentType } from "./AppObjectComponent";

/**
 * Presentation Manager (PM) component that transforms application state into view models
 * 
 * AppObjectPM acts as a mediator between application state (entities) and views.
 * It transforms raw application data into a format that's optimized for presentation,
 * implementing the presentation model or MVVM pattern.
 * 
 * A PM typically:
 * 1. Observes entity changes
 * 2. Transforms entity data into view models
 * 3. Notifies attached views when view models change
 * 4. Handles view model caching and optimization
 * 
 * @typeparam T The view model type this PM produces
 */
export abstract class AppObjectPM<T> extends AppObjectComponent {
  /** Identifies this as a Presentation Manager component */
  readonly componentType = AppObjectComponentType.PM;
  
  /**
   * Compares two view models to determine if they're equivalent
   * Used to prevent unnecessary view updates when the view model hasn't changed
   * 
   * @param a First view model to compare
   * @param b Second view model to compare
   * @returns True if the view models are considered equal, false otherwise
   */
  abstract vmsAreEqual(a: T, b: T): boolean;

  /** The most recently generated view model */
  private _lastVM?: T;
  
  /**
   * Gets the most recently generated view model
   * @returns The last view model or undefined if none has been generated
   */
  get lastVM(): T | undefined {
    return this._lastVM;
  }

  /** List of view update functions to notify when the view model changes */
  private observerList = new ObserverList<T>();

  /**
   * Registers a view update function to be called when the view model changes
   * If a view model already exists, the provided function is called immediately with that model
   * 
   * @param updateView Function to call with updated view models
   */
  addView(updateView: (vm: T) => void): void {
    this.observerList.add(updateView);

    // Immediately update the view with current view model if one exists
    if (this._lastVM !== undefined) {
      updateView(this._lastVM);
    }
  }

  /**
   * Unregisters a previously added view update function
   * 
   * @param updateView The view update function to remove
   */
  removeView(updateView: (vm: T) => void): void {
    this.observerList.remove(updateView);
  }

  /**
   * Updates the view model and notifies all registered views if the model has changed
   * This method should be called by derived classes when the view model needs to be updated
   * 
   * The method performs equality checking to prevent unnecessary updates when
   * the new view model is equivalent to the previous one
   * 
   * @param vm The new view model
   */
  doUpdateView(vm: T) {
    // Skip update if the view model hasn't changed
    if (this._lastVM && this.vmsAreEqual(this._lastVM, vm)) {
      return;
    }

    this._lastVM = vm;
    this.observerList.notify(vm);
  }

  /**
   * Cleans up resources and detaches this PM from its parent AppObject
   */
  dispose() {
    this.observerList.clear();
    if (this.appObject.getComponent(this.type) === this) {
      this.appObject.removeComponent(this.type);
    }
    super.dispose();
  }
}
