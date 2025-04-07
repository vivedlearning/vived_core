import {
  AppObjectComponent,
  AppObjectComponentType,
} from "./AppObjectComponent";

/**
 * AppObjectUC (Use Case) serves as a base use case class within the application framework.
 *
 * Use Cases are components that represent specific application operations or workflows.
 * They encapsulate business rules and coordinate interactions between different parts
 * of the application. Extend this class to implement specific use case scenarios.
 *
 * @extends AppObjectComponent
 * @example
 * ```typescript
 * class PurchaseItemUC extends AppObjectUC {
 *   execute(itemId: string, quantity: number): boolean {
 *     // Implement the purchase item use case
 *     return true; // if successful
 *   }
 * }
 * ```
 */
export class AppObjectUC extends AppObjectComponent {
  /**
   * The component type identifier used to categorize this component as a use case
   * This property helps the component system identify and manage use case components.
   * @readonly
   */
  readonly componentType = AppObjectComponentType.UC;
}
