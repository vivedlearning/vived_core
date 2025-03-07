import {
  AppObjectComponent,
  AppObjectComponentType,
} from "./AppObjectComponent";

export class AppObjectController extends AppObjectComponent {
  readonly componentType = AppObjectComponentType.CONTROLLER;
}
