/**
 * exampleFeature.integration.test.ts
 * 
 * Integration test for ExampleFeature that verifies the entire feature works together
 * This test ensures that the factory, adapters, PMs, entities, and controllers all
 * work together as expected.
 */

import { AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { exampleSingletonPmAdapter } from "../Adapters/exampleSingletonPmAdapter";
import { toggleExampleBoolean } from "../Controllers/toggleExampleBoolean";
import { ExampleVM } from "../PMs/ExampleSingletonPM";
import { setupExampleFeature } from "../Factory/setupExampleFeature";

describe("ExampleFeature Integration", () => {
  let appObjects: AppObjectRepo;
  let mockViewCallback: jest.Mock<void, [ExampleVM]>;
  let vmUpdates: ExampleVM[];
  let originalWarningFn: any;
  let originalErrorFn: any;

  beforeEach(() => {
    // Create a fresh AppObjectRepo for each test
    appObjects = makeAppObjectRepo();
    
    // Save original functions
    originalWarningFn = appObjects.submitWarning;
    originalErrorFn = appObjects.submitError;
    
    // Replace with silent mocks to prevent console output
    appObjects.submitWarning = jest.fn();
    appObjects.submitError = jest.fn();
    
    // Create a mock view callback that will store updated view models
    vmUpdates = [];
    mockViewCallback = jest.fn((vm: ExampleVM) => {
      vmUpdates.push({...vm}); // Store a copy of each view model update
    });
    
    // Setup the ExampleFeature using the factory
    setupExampleFeature(appObjects);
    
    // Connect the mock view to the PM through the adapter
    exampleSingletonPmAdapter.subscribe(appObjects, mockViewCallback);
  });

  afterEach(() => {
    // Unsubscribe the mock view
    exampleSingletonPmAdapter.unsubscribe(appObjects, mockViewCallback);
    
    // Restore original functions
    if (originalWarningFn) appObjects.submitWarning = originalWarningFn;
    if (originalErrorFn) appObjects.submitError = originalErrorFn;
  });

  it("should update the view when toggleExampleBoolean is called", () => {
    // Check initial state (mockViewCallback should have been called once initially)
    expect(mockViewCallback).toHaveBeenCalledTimes(1);
    expect(vmUpdates[0].aBoolProperty).toBe(false); // Initial value is false
    
    // Call the controller to toggle the boolean
    toggleExampleBoolean(appObjects);
    
    // Check that the view was updated
    expect(mockViewCallback).toHaveBeenCalledTimes(2);
    expect(vmUpdates[1].aBoolProperty).toBe(true); // Value should be toggled to true
    
    // Toggle again
    toggleExampleBoolean(appObjects);
    
    // Check that the view was updated again
    expect(mockViewCallback).toHaveBeenCalledTimes(3);
    expect(vmUpdates[2].aBoolProperty).toBe(false); // Value should be toggled back to false
  });
});