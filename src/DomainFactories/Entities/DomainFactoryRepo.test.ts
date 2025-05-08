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

    // Create mock factories and add them to the repository
    const factory1AO = appObjects.getOrCreate("factory1");
    const factory2AO = appObjects.getOrCreate("factory2");
    mockFactory1 = new MockDomainFactory(factory1AO);
    mockFactory2 = new MockDomainFactory(factory2AO);

    // Manually register the factories with the repository
    repo["entityLookup"].set(factory1AO.id, mockFactory1);
    repo["entityLookup"].set(factory2AO.id, mockFactory2);
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
    // Override the default factory names for the test
    Object.defineProperty(mockFactory1, "factoryName", {
      value: "TestFactory1",
    });
    Object.defineProperty(mockFactory2, "factoryName", {
      value: "TestFactory2",
    });

    // Test retrieving by name
    expect(repo.getByName("TestFactory1")).toBe(mockFactory1);
    expect(repo.getByName("TestFactory2")).toBe(mockFactory2);
    expect(repo.getByName("NonExistentFactory")).toBeUndefined();
  });
});
