/**
 * MockToggleExampleBooleanUC.ts
 * 
 * This file demonstrates how to implement a mock singleton UC for testing.
 * Mock singleton UCs extend the real UC classes and provide helper functions
 * to create and register them as singletons for tests.
 * 
 * Key concepts:
 * - Mock singleton UCs extend the real UC classes
 * - They override methods with test implementations
 * - They register themselves as singletons just like the real UCs
 * - They include helper functions to create them in tests
 * 
 * Usage pattern (in tests):
 * ```typescript
 * // In a test file
 * const mockUC = makeMockToggleExampleBooleanUC(appObject);
 * const spy = jest.spyOn(mockUC, 'toggleExampleBoolean');
 * 
 * // Call the function that should use the UC
 * toggleExampleBoolean(appObjects);
 * 
 * // Verify the UC method was called correctly
 * expect(spy).toHaveBeenCalled();
 * ```
 */

import { AppObject } from "../../AppObject";
import { ToggleExampleBooleanUC } from "../UCs/ToggleExampleBooleanUC";

/**
 * Mock implementation of ToggleExampleBooleanUC for testing
 * Provides a no-op implementation of toggleExampleBoolean that can be spied on in tests
 */
export class MockToggleExampleBooleanUC extends ToggleExampleBooleanUC {
  /**
   * Mock implementation that does nothing
   * In tests, this can be replaced with a Jest spy to track calls
   */
  toggleExampleBoolean = (): void => {};

  constructor(appObject: AppObject) {
    super(appObject, ToggleExampleBooleanUC.type);
    // Register as a singleton just like the real UC
    this.appObjects.registerSingleton(this);
  }
}

/**
 * Helper factory function to create a mock ToggleExampleBooleanUC
 * @param appObject The AppObject to attach the UC to
 * @returns A new MockToggleExampleBooleanUC instance
 */
export function makeMockToggleExampleBooleanUC(
  appObject: AppObject
): MockToggleExampleBooleanUC {
  return new MockToggleExampleBooleanUC(appObject);
}
