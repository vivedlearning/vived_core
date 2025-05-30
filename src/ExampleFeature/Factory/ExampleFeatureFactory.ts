import { DomainFactory } from "../../DomainFactories";
import { makeSingletonEntityExample } from "../Entities/ExampleSingletonEntity";
import { makeExampleSingletonPM } from "../PMs/ExampleSingletonPM";
import { makeToggleExampleBooleanUC } from "../UCs/ToggleExampleBooleanUC";

/**
 * Factory responsible for setting up the Example Feature domain components.
 * 
 * This factory initializes all entities, use cases, and presentation models
 * required for the Example Feature functionality. It follows the domain-driven
 * design pattern by organizing components into their respective layers.
 * 
 * @extends DomainFactory
 */
export class ExampleFeatureFactory extends DomainFactory
{
	factoryName = "ExampleFeatureFactory";

	/**
	 * Sets up all entities required for the Example Feature.
	 * 
	 * Initializes singleton entities that maintain the state and business
	 * logic for the example feature functionality.
	 */
	setupEntities(): void
	{
		makeSingletonEntityExample(this.appObject);
	}

	/**
	 * Sets up all use cases for the Example Feature.
	 * 
	 * Initializes use cases that define the business operations and
	 * workflows available in the example feature.
	 */
	setupUCs(): void
	{
		makeToggleExampleBooleanUC(this.appObject);
	}

	/**
	 * Sets up all presentation models for the Example Feature.
	 * 
	 * Initializes presentation models that handle the view logic and
	 * state management for UI components related to the example feature.
	 */
	setupPMs(): void
	{
		makeExampleSingletonPM(this.appObject);
	}

	/**
	 * Performs any final setup operations after all components are initialized.
	 * 
	 * This method is called after entities, use cases, and presentation models
	 * have been set up. Currently no additional setup is required for this feature.
	 */
	finalSetup(): void
	{
		// No additional setup required for this feature
	}
}