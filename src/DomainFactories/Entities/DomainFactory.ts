import { AppObject, AppObjectEntity } from "../../AppObject";
import { DomainFactoryRepo } from "./DomainFactoryRepo";

/**
 * Abstract base class for domain factories in the application architecture.
 *
 * DomainFactory is responsible for setting up and initializing the components
 * of a specific domain in a structured, multi-phase approach. Each domain factory
 * automatically registers itself with the DomainFactoryRepo during construction.
 *
 * The setup process follows a specific sequence to ensure dependencies are properly
 * resolved:
 * 1. First, entities are set up (data models)
 * 2. Then, use cases are set up (business logic)
 * 3. Next, presentation managers are set up (view models)
 * 4. Finally, any remaining initialization is performed
 *
 * This ordered approach ensures that dependencies are available when needed, as
 * UCs typically depend on entities, and PMs typically depend on UCs.
 */
export abstract class DomainFactory extends AppObjectEntity {
  /** Unique type identifier for this component */
  static type = "DomainFactory";

  /**
   * Set up entities for this domain.
   * This phase should create and configure all data models and repositories.
   */
  abstract setupEntities(): void;

  /**
   * Set up use cases for this domain.
   * This phase should create and configure business logic components that operate on entities.
   */
  abstract setupUCs(): void;

  /**
   * Set up presentation managers for this domain.
   * This phase should create and configure components that transform entity data into view models.
   */
  abstract setupPMs(): void;

  /**
   * Perform final setup operations for this domain.
   * This phase handles any remaining initialization that depends on all other components being ready.
   */
  abstract finalSetup(): void;

  /**
   * Creates a new DomainFactory and registers it with the DomainFactoryRepo.
   * @param appObject The parent AppObject this component will be attached to
   */
  constructor(appObject: AppObject) {
    super(appObject, DomainFactory.type);
    // Auto-register with the repository
    DomainFactoryRepo.get(this.appObjects)?.add(this);
  }
}
