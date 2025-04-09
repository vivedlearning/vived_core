/**
 * MockEditExampleStringUC.ts
 * 
 * This file demonstrates how to implement a mock UC for testing.
 * Mock UCs extend the real UC classes but override their methods with test implementations.
 * This allows tests to verify that the UC methods are called correctly without
 * actually modifying entities or performing real operations.
 * 
 * Key concepts:
 * - Mock UCs extend the real UC classes
 * - They override methods with test implementations (often empty or spy functions)
 * - They're used in unit tests to isolate components from their dependencies
 * - They help verify that methods are called with the correct parameters
 * 
 * Usage pattern (in tests):
 * ```typescript
 * // In a test file
 * const mockUC = new MockEditExampleStringUC(appObject);
 * const spy = jest.spyOn(mockUC, 'editExampleString');
 * 
 * // Call the function that should use the UC
 * someFunction(appObject);
 * 
 * // Verify the UC method was called correctly
 * expect(spy).toHaveBeenCalledWith('expected value');
 * ```
 */

import { AppObject } from "../../AppObject";
import { EditExampleStringUC } from "../UCs/EditExampleStringUC";

/**
 * Mock implementation of EditExampleStringUC for testing
 * Provides a no-op implementation of editExampleString that can be spied on in tests
 */
export class MockEditExampleStringUC extends EditExampleStringUC {
  /**
   * Mock implementation that does nothing
   * In tests, this can be replaced with a Jest spy to track calls
   */
  editExampleString = (text: string): void => {};

  constructor(appObject: AppObject) {
    super(appObject, EditExampleStringUC.type);
  }
}
