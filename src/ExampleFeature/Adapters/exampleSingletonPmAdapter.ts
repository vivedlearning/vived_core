/**
 * exampleSingletonPmAdapter.ts
 * 
 * This file demonstrates how to implement a Singleton PM Adapter to connect UI components
 * to singleton PMs. Singleton PM Adapters provide a standardized way for UI frameworks
 * to subscribe to singleton PM updates without needing to specify an AppObject ID.
 * 
 * Key concepts:
 * - Singleton PM Adapters implement the SingletonPmAdapter<VM> interface
 * - They handle subscribing UI components to singleton PMs and unsubscribing when done
 * - They provide a default view model for initial rendering before data is available
 * - They don't require an AppObject ID since they connect to globally accessible singletons
 * 
 * Usage pattern (React example):
 * ```typescript
 * // In a React component
 * function MyComponent() {
 *   // Note: no ID needed since it's connecting to a singleton
 *   const viewModel = useSingletonPmAdapter(exampleSingletonPmAdapter);
 *   return <div>{viewModel.aBoolProperty ? "True" : "False"}</div>;
 * }
 * ```
 */

import { AppObjectRepo } from "../../AppObject";
import { SingletonPmAdapter } from "../../Types/SingletonPmAdapter";
import {
  defaultSlideNavigationVM,
  ExampleSingletonPM,
  ExampleVM
} from "../PMs/ExampleSingletonPM";

/**
 * An adapter that connects UI components to the ExampleSingletonPM.
 * Implements SingletonPmAdapter<ExampleVM> because ExampleSingletonPM provides ExampleVM view models.
 */
export const exampleSingletonPmAdapter: SingletonPmAdapter<ExampleVM> = {
  // Default view model to use before data is available
  defaultVM: defaultSlideNavigationVM,
  
  /**
   * Subscribes a UI component to updates from the ExampleSingletonPM
   * @param appObjects The application's AppObjectRepo
   * @param setVM Callback function that updates the UI component
   */
  subscribe: (appObjects: AppObjectRepo, setVM: (vm: ExampleVM) => void) => {
    // Find the singleton PM using its static get method
    const pm = ExampleSingletonPM.get(appObjects);
    if (!pm) {
      appObjects.submitError(
        "exampleSingletonPmAdapter",
        "Unable to find ExampleSingletonPM"
      );
      return;
    }
    
    // Register the UI component's callback to receive updates
    pm.addView(setVM);
  },
  
  /**
   * Unsubscribes a UI component from updates when it's no longer needed
   * @param appObjects The application's AppObjectRepo
   * @param setVM The same callback function that was used to subscribe
   */
  unsubscribe: (appObjects: AppObjectRepo, setVM: (vm: ExampleVM) => void) => {
    // Find the singleton PM and remove the view if it exists
    ExampleSingletonPM.get(appObjects)?.removeView(setVM);
  }
};
