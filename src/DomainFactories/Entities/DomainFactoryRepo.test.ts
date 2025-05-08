import { AppObject, AppObjectRepo, makeAppObjectRepo } from "../../AppObject";
import { MockDomainFactory } from "../Mocks/MockDomainFactory";
import { DomainFactoryRepo } from "./DomainFactoryRepo";

describe("DomainFactoryRepo", () => {
  let appObjects: AppObjectRepo;
  let appObject: AppObject;
  let repo: DomainFactoryRepo;
  let mockFactory1: MockDomainFactory;
  let mockFactory2: MockDomainFactory;

  beforeEach(() => {
    appObjects = makeAppObjectRepo();
    appObject = appObjects.getOrCreate("test object name");
    repo = new DomainFactoryRepo(appObject);
    mockFactory1 = new MockDomainFactory(appObjects.getOrCreate("factory1"));
    mockFactory2 = new MockDomainFactory(appObjects.getOrCreate("factory2"));
  });

  it("is retrievable via static get method", () => {
    expect(DomainFactoryRepo.get(appObjects)).toBe(repo);
  });

  it("has the correct type", () => {
    expect(DomainFactoryRepo.type).toBe("DomainFactoryRepo");
  });

  it("calls setupEntities on all domain factories", () => {
    repo.setupDomain();

    expect(mockFactory1.setupEntities).toHaveBeenCalled();
    expect(mockFactory2.setupEntities).toHaveBeenCalled();
  });

  it("calls setupUCs on all domain factories", () => {
    repo.setupDomain();

    expect(mockFactory1.setupUCs).toHaveBeenCalled();
    expect(mockFactory2.setupUCs).toHaveBeenCalled();
  });

  it("calls setupPMs on all domain factories", () => {
    repo.setupDomain();

    expect(mockFactory1.setupPMs).toHaveBeenCalled();
    expect(mockFactory2.setupPMs).toHaveBeenCalled();
  });

  it("calls finalSetup on all domain factories", () => {
    repo.setupDomain();

    expect(mockFactory1.finalSetup).toHaveBeenCalled();
    expect(mockFactory2.finalSetup).toHaveBeenCalled();
  });
  it("executes setup steps in the correct order", () => {
    const sequence: string[] = [];

    mockFactory1.setupEntities.mockImplementation(() =>
      sequence.push("setupEntities1")
    );
    mockFactory1.setupUCs.mockImplementation(() => sequence.push("setupUCs1"));
    mockFactory1.setupPMs.mockImplementation(() => sequence.push("setupPMs1"));
    mockFactory1.finalSetup.mockImplementation(() =>
      sequence.push("finalSetup1")
    );

    mockFactory2.setupEntities.mockImplementation(() =>
      sequence.push("setupEntities2")
    );
    mockFactory2.setupUCs.mockImplementation(() => sequence.push("setupUCs2"));
    mockFactory2.setupPMs.mockImplementation(() => sequence.push("setupPMs2"));
    mockFactory2.finalSetup.mockImplementation(() =>
      sequence.push("finalSetup2")
    );

    repo.setupDomain();

    expect(sequence).toEqual([
      "setupEntities1",
      "setupEntities2",
      "setupUCs1",
      "setupUCs2",
      "setupPMs1",
      "setupPMs2",
      "finalSetup1",
      "finalSetup2",
    ]);
  });
  it("retrieves a domain factory by name", () => {
    // For testing, we'll access the factoryName that should be provided by MockDomainFactory
    const factoryName1 = mockFactory1.factoryName;
    const factoryName2 = mockFactory2.factoryName;

    // Test retrieving by name
    expect(repo.getByName(factoryName1)).toBe(mockFactory1);
    expect(repo.getByName(factoryName2)).toBe(mockFactory2);
    expect(repo.getByName("NonExistentFactory")).toBeUndefined();
  });
});
