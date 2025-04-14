/**
 * examplePmAdapter.ts
 * 
 * This file demonstrates how to implement a PM Adapter to connect UI components to PMs.
 * PM Adapters provide a standardized way for UI frameworks to subscribe to PM updates.
 * This adapter connects to regular (non-singleton) PMs that require an AppObject ID.
 * 
 * Key concepts:
 * - PM Adapters implement the PmAdapter<VM> interface where VM is the view model type
 * - They handle subscribing UI components to PMs and unsubscribing when done
 * - They provide a default view model for initial rendering before data is available
 * - They abstract away the details of finding and connecting to specific PMs
 * 
 * Usage pattern (React example):
 * ```typescript
 * // In a React component
 * function MyComponent({ id }) {
 *   const viewModel = usePmAdapter(examplePmAdapter, id);
 *   return <div>{viewModel}</div>;
 * }
 * ```
 */

import { AppObjectRepo } from "../../AppObject";
import { PmAdapter } from "../../Types/PmAdapter";
import { ExamplePM } from "../PMs/ExamplePM";

/**
 * An adapter that connects UI components to ExamplePM instances.
 * Implements PmAdapter<string> because ExamplePM provides string view models.
 */
export const examplePmAdapter: PmAdapter<string> = {
  // Default view model to use before data is available
  defaultVM: "",
  
  /**
   * Subscribes a UI component to updates from an ExamplePM
   * @param id The ID of the AppObject containing the PM
   * @param appObjects The application's AppObjectRepo
   * @param setVM Callback function that updates the UI component
   */
  subscribe: (
    id: string,
    appObjects: AppObjectRepo,
    setVM: (vm: string) => void
  ) => {
    // Return early if no ID is provided
    if (!id) return;

    // Find the PM using the provided ID
    const pm = ExamplePM.getById(id, appObjects);
    if (!pm) {
      appObjects.submitWarning("examplePmAdapter", "Unable to find ExamplePM");
      return;
    }
    
    // Register the UI component's callback to receive updates
    pm.addView(setVM);
  },
  
  /**
   * Unsubscribes a UI component from updates when it's no longer needed
   * @param id The ID of the AppObject containing the PM
   * @param appObjects The application's AppObjectRepo
   * @param setVM The same callback function that was used to subscribe
   */
  unsubscribe: (
    id: string,
    appObjects: AppObjectRepo,
    setVM: (vm: string) => void
  ) => {
    // Find the PM and remove the view if it exists
    ExamplePM.getById(id, appObjects)?.removeView(setVM);
  }
};
