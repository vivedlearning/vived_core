import { AppObjectRepo } from "../AppObject";

/**
 * PmAdapter interface defines a bridge between UI components and AppObjectPM (Presentation Manager) components.
 * It allows UI frameworks (like React, Vue, Angular, etc.) to subscribe to view model updates from specific AppObjects.
 * 
 * This adapter is used for AppObject-specific subscriptions, where each UI component subscribes to
 * a particular AppObject's presentation manager, identified by its ID.
 * 
 * Usage example with React:
 * ```typescript
 * // Define an adapter for a specific view model type
 * class MyComponentAdapter implements PmAdapter<MyViewModel> {
 *   // Default view model when no data is available
 *   defaultVM: MyViewModel = { value: 0, label: "" };
 *   
 *   // Subscribe to updates from a specific AppObject's presentation manager
 *   subscribe(id: string, appObjects: AppObjectRepo, setVM: (vm: MyViewModel) => void): void {
 *     const appObject = appObjects.get(id);
 *     if (!appObject) return;
 *     
 *     const pm = appObject.getComponent<MyPM>("MyPresentationManager");
 *     if (pm) {
 *       pm.addView(setVM);
 *       // Initial update with current view model if available
 *       if (pm.lastVM) setVM(pm.lastVM);
 *     }
 *   }
 *   
 *   // Unsubscribe when component unmounts
 *   unsubscribe(id: string, appObjects: AppObjectRepo, setVM: (vm: MyViewModel) => void): void {
 *     const appObject = appObjects.get(id);
 *     if (!appObject) return;
 *     
 *     const pm = appObject.getComponent<MyPM>("MyPresentationManager");
 *     if (pm) {
 *       pm.removeView(setVM);
 *     }
 *   }
 * }
 * ```
 * 
 * @typeparam VM The view model type provided by this adapter
 */
export interface PmAdapter<VM> {
  /**
   * Default view model to use when no data is available
   * This prevents null/undefined handling in UI components
   */
  defaultVM: VM;
  
  /**
   * Subscribe to view model updates from an AppObject's presentation manager
   * 
   * @param id The ID of the AppObject to subscribe to
   * @param appObjects The repository containing the AppObjects
   * @param setVM Callback function that updates the UI with new view models
   */
  subscribe(
    id: string,
    appObjects: AppObjectRepo,
    setVM: (vm: VM) => void
  ): void;
  
  /**
   * Unsubscribe from view model updates when a component is being unmounted or no longer needs updates
   * 
   * @param id The ID of the AppObject to unsubscribe from
   * @param appObjects The repository containing the AppObjects
   * @param setVM The same callback function that was provided to subscribe
   */
  unsubscribe(
    id: string,
    appObjects: AppObjectRepo,
    setVM: (vm: VM) => void
  ): void;
}
