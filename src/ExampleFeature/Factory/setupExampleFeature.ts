/**
 * setupExampleFeature.ts
 * 
 * This file provides a setup function to initialize the ExampleFeature components.
 * It creates a dedicated AppObject for ExampleFeature and adds all required
 * singleton components to it.
 */

import { AppObjectRepo } from "../../AppObject";
import { makeSingletonEntityExample, SingletonEntityExample } from "../Entities/ExampleSingletonEntity";
import { makeExampleSingletonPM } from "../PMs/ExampleSingletonPM";
import { makeToggleExampleBooleanUC } from "../UCs/ToggleExampleBooleanUC";

/**
 * Sets up the ExampleFeature by creating an AppObject and attaching required components.
 * 
 * @param appObjects - Repository of AppObjects to use for creating the feature
 * @returns The singleton entity instance
 */
export function setupExampleFeature(appObjects: AppObjectRepo): SingletonEntityExample {
  // Create a dedicated AppObject for ExampleFeature
  const appObject = appObjects.getOrCreate("ExampleFeature");
  
  // Add singleton components to the AppObject
  const entity = makeSingletonEntityExample(appObject);
  makeExampleSingletonPM(appObject);
  makeToggleExampleBooleanUC(appObject);
  
  return entity;
}