import {
  AppObject,
  AppObjectEntityRepo,
  AppObjectRepo,
  getSingletonComponent,
} from "../../AppObject";
import { DomainFactory } from "./DomainFactory";

/**
 * Repository for managing DomainFactory instances in the application.
 *
 * DomainFactoryRepo is implemented as a singleton that coordinates the setup
 * and initialization of all domain factories. It ensures that the setup phases
 * are executed in the correct order across all registered factories:
 * 1. All factories set up their entities first
 * 2. Then all factories set up their use cases
 * 3. Next all factories set up their presentation managers
 * 4. Finally, all factories perform their final setup operations
 *
 * This phased approach ensures that components in one domain can depend on
 * components from another domain being properly initialized.
 */
export class DomainFactoryRepo extends AppObjectEntityRepo<DomainFactory> {
  /** Unique type identifier for this component */
  static type = "DomainFactoryRepo";

  /**
   * Global accessor for the singleton repository
   * @param appObjects The AppObjectRepo to search in
   * @returns The singleton DomainFactoryRepo or undefined if not created yet
   */
  static get(appObjects: AppObjectRepo) {
    return getSingletonComponent<DomainFactoryRepo>(
      DomainFactoryRepo.type,
      appObjects
    );
  }

  /**
   * Orchestrates the setup of the entire domain layer in the correct sequence.
   * Calls each setup phase on all factories before proceeding to the next phase.
   * This ensures cross-domain dependencies are properly resolved.
   */
  setupDomain = () => {
    const allFactories = this.getAll();

    // Phase 1: Set up all entities first
    allFactories.forEach((domainFactory) => {
      domainFactory.setupEntities();
    });

    // Phase 2: Set up all use cases next
    allFactories.forEach((domainFactory) => {
      domainFactory.setupUCs();
    });

    // Phase 3: Set up all presentation managers
    allFactories.forEach((domainFactory) => {
      domainFactory.setupPMs();
    });

    // Phase 4: Perform final setup operations
    allFactories.forEach((domainFactory) => {
      domainFactory.finalSetup();
    });
  };

  /**
   * Retrieves a domain factory by its name.
   * @param name The name of the domain factory to find
   * @returns The matching domain factory or undefined if not found
   */
  getByName(name: string): DomainFactory | undefined {
    const allFactories = this.getAll();
    return allFactories.find((factory) => factory.factoryName === name);
  }

  /**
   * Creates a new DomainFactoryRepo and registers it with the given AppObject.
   * @param appObject The parent AppObject this component will be attached to
   */
  constructor(appObject: AppObject) {
    super(appObject, DomainFactoryRepo.type);
  }
}
