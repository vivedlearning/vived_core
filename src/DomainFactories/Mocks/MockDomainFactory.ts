import { AppObject } from "../../AppObject";
import { DomainFactory } from "../Entities/DomainFactory";

/**
 * A mock implementation of the DomainFactory for use in tests.
 *
 * MockDomainFactory replaces the abstract methods from DomainFactory
 * with Jest mock functions (jest.fn()), allowing tests to:
 * 1. Verify that these methods are called
 * 2. Count how many times they are called
 * 3. Assert the order in which they are called
 * 4. Provide custom implementations when needed
 *
 * This class is particularly useful for testing the DomainFactoryRepo's
 * setupDomain method and ensuring the proper sequence of setup phases.
 */
export class MockDomainFactory extends DomainFactory {
  /** The name of this factory */
  readonly factoryName = "MockDomainFactory";

  /** Mock implementation of setting up entities */
  setupEntities = jest.fn();

  /** Mock implementation of setting up use cases */
  setupUCs = jest.fn();

  /** Mock implementation of setting up presentation managers */
  setupPMs = jest.fn();

  /** Mock implementation of the final setup phase */
  finalSetup = jest.fn();

  /**
   * Creates a new MockDomainFactory instance
   * @param appObject The parent AppObject this component will be attached to
   */
  constructor(appObject: AppObject) {
    super(appObject);
  }
}
