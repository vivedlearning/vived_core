import { AppObjectRepo } from "./AppObjectRepo";

export function printAppObjectDetails(id: string, appObjects: AppObjectRepo) {
  const appObject = appObjects.get(id);
  if (!appObject) {
    console.warn("[printAppObjectDetails] Unable to find App Object by ID");
    return;
  }

  console.log("[printAppObjectDetails] Start App Object Details ---");
  console.log(`id: ${appObject.id}`);
  const components = appObject.allComponents();
  components.forEach((component) => {
    console.log(`Has Component: ${component.type}`);
  });
  console.log("[printAppObjectDetails] End App Object Details ---");
}
