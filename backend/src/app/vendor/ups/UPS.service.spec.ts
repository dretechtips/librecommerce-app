import State from "src/app/common/enum/continent/country/US/State";
import AddressSchema from "src/app/common/model/schema/Address.schema";
import UPSService from "./UPS.service";

describe("UPS Service", () => {
  let service: UPSService;
  const shipperAddress: AddressSchema = new AddressSchema(
    "2500 Frosted Green Lane",
    "Plano",
    State.TEXAS,
    75025
  );
  const realAddress: AddressSchema = new AddressSchema(
    "70 Lake Ave",
    "North Miami Beach",
    State.FLORIDA,
    33160
  );
  const fakeAddress: AddressSchema = new AddressSchema(
    "2341 XYZ Street",
    "Fake City",
    State.DISTRICT_OF_COLOMBIA,
    12345
  );
  beforeEach(async () => {
    service = new UPSService();
  });

  describe("Check Availiability", () => {
    it("should return true", async () => {
      expect(await service.isAvailable()).toBe(true);
    });
  });

  describe("Address Validation", () => {
    it("should return true", async () => {
      expect(await service.addressValidation(realAddress)).toBe(true);
    });

    it("should return false", async () => {
      expect(await service.addressValidation(fakeAddress)).toBe(false);
    });
  });

  /**
   * @todo
   */
  describe("Fetch Cost", () => {
    it("should return []", async () => {
      expect(await service.getCosts([], 2)).toBe([]);
    });
  });

  describe("Ship To Miami", () => {
    it("should return", async () => {
      expect(await service.ship(2, packages, shipperAddress, realAddress)).toBe(
        undefined
      );
    });
  });

  describe("Cancel Miami Shipping", () => {});

  describe("Ship To Miami", () => {});

  describe("Track Miami Shipping", () => {});

  describe("Return Miami Shipping", () => {});
});
