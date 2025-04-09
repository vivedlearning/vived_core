/**
 * MockExampleSingletonPM.ts
 * 
 * This file demonstrates how to implement a mock singleton PM for testing.
 * Mock singleton PMs extend the real singleton PM classes and provide helper
 * functions to create and access them in tests.
 * 
 * Key concepts:
 * - Mock singleton PMs extend the real singleton PM classes
 * - They override methods with test implementations
 * - They include helper functions to create and access them in tests
 * - They're used to test adapters and controllers that depend on singleton PMs
 * 
 * Usage pattern (in tests):
 * ```typescript
 * // In a test file
 * const mockPM = makeMockExampleSingletonPM(appObjects);
 * const addViewSpy = jest.spyOn(mockPM, 'addView');
 * 
 * // Test the component that uses the singleton PM
 * adapter.subscribe(appObjects, setVM);
 * 
 * // Verify the PM method was called correctly
 * expect(addViewSpy).toHaveBeenCalledWith(setVM);
 * ```
 */

import { AppObject, AppObjectRepo } from "../../AppObject";
import { ExampleSingletonPM } from "../PMs/ExampleSingletonPM";

/**
 * Mock implementation of ExampleSingletonPM for testing
 * Provides simplified implementations of required methods
 */
export class MockExampleSingletonPM extends ExampleSingletonPM {
  /**
   * Simplified implementation that always returns true
   * This avoids the need to implement real comparison logic in tests
   */
  vmsAreEqual = () => {
    return true;
  };

  constructor(appObject: AppObject) {
    super(appObject, ExampleSingletonPM.type);
  }
}

/**
 * Helper function to create and register a MockExampleSingletonPM
 * Returns the created mock for use in tests
 * 
 * @param appObjects The AppObjectRepo to register the mock with
 * @returns A new MockExampleSingletonPM instance
 */
export function makeMockExampleSingletonPM(appObjects: AppObjectRepo) {
  return new MockExampleSingletonPM(
    appObjects.getOrCreate("MockExampleSingletonPM")
  );
}
