import { AppObjectRepo } from "../AppObject";

/**
 * SingletonPmAdapter interface defines a bridge between UI components and singleton presentation managers.
 * It's similar to PmAdapter but designed for components that subscribe to a singleton PM 
 * (a PM that exists only once in the application).
 * 
 * This adapter simplifies the subscription process when there's only one instance of a specific
 * presentation manager type in the entire application, eliminating the need to specify an AppObject ID.
 * 
 * Usage example with React:
 * ```typescript
 * // Define an adapter for a singleton presentation manager
 * class GlobalSettingsPMAdapter implements SingletonPmAdapter<SettingsViewModel> {
 *   // Default view model when no data is available
 *   defaultVM: SettingsViewModel = { theme: "light", fontSize: "medium" };
 *   
 *   // Subscribe to updates from the singleton presentation manager
 *   subscribe(appObjects: AppObjectRepo, setVM: (vm: SettingsViewModel) => void): void {
 *     // Get the singleton PM
 *     const settingsPM = appObjects.getSingleton<SettingsPM>("SettingsPM");
 *     if (settingsPM) {
 *       // Register the update callback
 *       settingsPM.addView(setVM);
 *       // Initial update with current view model if available
 *       if (settingsPM.lastVM) setVM(settingsPM.lastVM);
 *     }
 *   }
 *   
 *   // Unsubscribe when component unmounts
 *   unsubscribe(appObjects: AppObjectRepo, setVM: (vm: SettingsViewModel) => void): void {
 *     const settingsPM = appObjects.getSingleton<SettingsPM>("SettingsPM");
 *     if (settingsPM) {
 *       settingsPM.removeView(setVM);
 *     }
 *   }
 * }
 * ```
 * 
 * @typeparam VM The view model type provided by this adapter
 */
export interface SingletonPmAdapter<VM> {
  /**
   * Default view model to use when no data is available
   * This prevents null/undefined handling in UI components
   */
  defaultVM: VM;
  
  /**
   * Subscribe to view model updates from a singleton presentation manager
   * 
   * @param appObjects The repository containing the AppObjects
   * @param setVM Callback function that updates the UI with new view models
   */
  subscribe(appObjects: AppObjectRepo, setVM: (vm: VM) => void): void;
  
  /**
   * Unsubscribe from view model updates when a component is being unmounted or no longer needs updates
   * 
   * @param appObjects The repository containing the AppObjects
   * @param setVM The same callback function that was provided to subscribe
   */
  unsubscribe(appObjects: AppObjectRepo, setVM: (vm: VM) => void): void;
}
