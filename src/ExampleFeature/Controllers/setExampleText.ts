/**
 * setExampleText.ts
 * 
 * This file demonstrates how to implement a Controller function.
 * Controllers are simple functions that provide a simplified API for UI components
 * to interact with Use Cases (UCs). They handle the details of finding the right
 * UC and calling its methods with the appropriate parameters.
 * 
 * Key concepts:
 * - Controllers are functions that take parameters from UI components
 * - They find the appropriate UC and call its methods
 * - They handle error cases and provide appropriate feedback
 * - They simplify the API for UI components
 * 
 * Usage pattern (React example):
 * ```typescript
 * // In a React component
 * function ExampleTextInput({ id, appObjects }) {
 *   const handleChange = (e) => {
 *     setExampleText(e.target.value, id, appObjects);
 *   };
 *   return <input onChange={handleChange} />;
 * }
 * ```
 */

import { AppObjectRepo } from "../../AppObject";
import { EditExampleStringUC } from "../UCs/EditExampleStringUC";

/**
 * Controller function to update the text of an ExampleEntity
 * 
 * @param text The new text to set
 * @param id The ID of the AppObject containing the EditExampleStringUC
 * @param appObjects The application's AppObjectRepo
 */
export function setExampleText(
  text: string,
  id: string,
  appObjects: AppObjectRepo
) {
  // Find the Use Case using the provided ID
  const uc = EditExampleStringUC.getById(id, appObjects);
  
  // Handle the case where the UC doesn't exist
  if (!uc) {
    appObjects.submitWarning(
      "setExampleText",
      "Unable to find EditExampleStringUC"
    );
    return;
  }

  // Call the UC method to perform the operation
  uc.editExampleString(text);
}
