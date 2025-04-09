/**
 * toggleExampleBoolean.ts
 * 
 * This file demonstrates how to implement a Controller function for a singleton UC.
 * This controller provides a simplified API for UI components to interact with 
 * the ToggleExampleBooleanUC singleton, handling the details of finding the UC
 * and calling its method.
 * 
 * Key concepts:
 * - Controllers for singleton UCs don't need an ID parameter
 * - They access the singleton UC using its static get() method
 * - They handle error cases and provide appropriate feedback
 * - They simplify the API for UI components
 * 
 * Usage pattern (React example):
 * ```typescript
 * // In a React component
 * function ToggleButton({ appObjects }) {
 *   return (
 *     <button onClick={() => toggleExampleBoolean(appObjects)}>
 *       Toggle
 *     </button>
 *   );
 * }
 * ```
 */

import { AppObjectRepo } from "../../AppObject";
import { ToggleExampleBooleanUC } from "../UCs/ToggleExampleBooleanUC";

/**
 * Controller function to toggle the boolean property of the SingletonEntityExample
 * 
 * @param appObjects The application's AppObjectRepo
 */
export function toggleExampleBoolean(appObjects: AppObjectRepo) {
  // Access the singleton UC using its static get method
  const uc = ToggleExampleBooleanUC.get(appObjects);
  
  // Handle the case where the UC doesn't exist yet
  if (!uc) {
    appObjects.submitWarning(
      "toggleExampleBoolean",
      "Unable to find ToggleExampleBooleanUC"
    );
    return;
  }

  // Call the UC method to perform the operation
  uc.toggleExampleBoolean();
}
