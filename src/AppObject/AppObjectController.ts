import {
  AppObjectComponent,
  AppObjectComponentType,
} from "./AppObjectComponent";

/**
 * AppObjectController serves as a base controller class within the application framework.
 *
 * Controllers are components that handle logic-related operations for an AppObject,
 * such as user input processing, state management, or business logic implementation.
 * Extend this class to create specialized controllers for specific application features.
 *
 * @extends AppObjectComponent
 * @example
 * ```typescript
 * class PlayerController extends AppObjectController {
 *   handleUserInput(input: UserInput) {
 *     // Process user input to control player object
 *   }
 * }
 * ```
 */
export class AppObjectController extends AppObjectComponent {
  /**
   * The component type identifier used to categorize this component as a controller
   * This property helps the component system identify and manage controller components.
   * @readonly
   */
  readonly componentType = AppObjectComponentType.CONTROLLER;
}
