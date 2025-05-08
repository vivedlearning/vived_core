import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { MockDomainFactory } from "../Mocks/MockDomainFactory";
import { DomainFactoryRepo } from "./DomainFactoryRepo";

describe("DomainFactory", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let factoryRepo: DomainFactoryRepo;

  beforeEach(() => {
    appObjects = makeAppObjectRepo();
    appObject = appObjects.getOrCreate("test factory");

    factoryRepo = new DomainFactoryRepo(appObject);
  });
  it("registers itself with DomainFactoryRepo during construction", () => {
    factoryRepo.add = jest.fn();
    const mockFactory = new MockDomainFactory(appObject);

    expect(factoryRepo.add).toHaveBeenCalledWith(mockFactory);
  });

  it("has a public factoryName property", () => {
    const mockFactory = new MockDomainFactory(appObject);
    expect(mockFactory.factoryName).toBe("MockDomainFactory");
  });
});
