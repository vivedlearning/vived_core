/**
 * MockExamplePM.ts
 * 
 * This file demonstrates how to implement a mock PM for testing.
 * Mock PMs extend the real PM classes but override their methods with test implementations.
 * This allows tests to verify PM behavior without depending on real entities.
 * 
 * Key concepts:
 * - Mock PMs extend the real PM classes
 * - They override methods with test implementations
 * - They're used in unit tests to isolate components from their dependencies
 * - They help test adapters and other components that use PMs
 * 
 * Usage pattern (in tests):
 * ```typescript
 * // In a test file
 * const mockPM = new MockExamplePM(appObject);
 * const addViewSpy = jest.spyOn(mockPM, 'addView');
 * 
 * // Test the component that uses the PM
 * adapter.subscribe(id, appObjects, setVM);
 * 
 * // Verify the PM method was called correctly
 * expect(addViewSpy).toHaveBeenCalledWith(setVM);
 * ```
 */

import { AppObject } from "../../AppObject";
import { ExamplePM } from "../PMs/ExamplePM";

/**
 * Mock implementation of ExamplePM for testing
 * Provides simplified implementations of required methods
 */
export class MockExamplePM extends ExamplePM {
  /**
   * Simplified implementation that always returns true
   * This avoids the need to implement real comparison logic in tests
   */
  vmsAreEqual = () => {
    return true;
  };

  constructor(appObject: AppObject) {
    super(appObject, ExamplePM.type);
  }
}
