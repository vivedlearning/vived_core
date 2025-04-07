import { AppObjectComponent } from "./AppObjectComponent";
import { AppObjectRepo } from "./AppObjectRepo";

/**
 * Retrieves a singleton component of the specified type from the application objects repository.
 *
 * This utility function provides a convenient way to access singleton components that should
 * have only one instance across the entire application.
 *
 * @template T - Type of the component to retrieve, must extend AppObjectComponent
 * @param {string} type - The type identifier of the component to retrieve
 * @param {AppObjectRepo} appObjects - The repository containing all application objects
 * @returns {T | undefined} The singleton component instance if found, otherwise undefined
 *
 * @example
 * ```typescript
 * const cameraController = getSingletonComponent<CameraController>(CameraController.type, appObjectRepo);
 * if (cameraController) {
 *   cameraController.focusOn(targetObject);
 * }
 * ```
 */
export function getSingletonComponent<T extends AppObjectComponent>(
  type: string,
  appObjects: AppObjectRepo
): T | undefined {
  return appObjects.getSingleton<T>(type);
}
