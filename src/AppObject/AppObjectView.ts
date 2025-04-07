import {
  AppObjectComponent,
  AppObjectComponentType,
} from "./AppObjectComponent";

/**
 * AppObjectView serves as a base view class within the application framework.
 *
 * Views are components that handle the visual representation of an AppObject,
 * such as rendering, animations, or user interface elements. Extend this class
 * to create custom visual representations for specific application objects.
 *
 * @extends AppObjectComponent
 * @example
 * ```typescript
 * class PlayerView extends AppObjectView {
 *   render(renderContext: RenderContext) {
 *     // Render the player character on screen
 *   }
 * }
 * ```
 */
export class AppObjectView extends AppObjectComponent {
  /**
   * The component type identifier used to categorize this component as a view
   * This property helps the component system identify and manage view components.
   * @readonly
   */
  readonly componentType = AppObjectComponentType.VIEW;
}
