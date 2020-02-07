import { TestingModule, Test } from "@nestjs/testing";
import DatabasesController from "./Databases.controller";
import DatabasesModule from "./Databases.module";
import { AvaliableLocation } from "./location/Location.interface";

/**
 * @returns Database Location
 */
export const mockDatabasesController = describe("DatabasesController", () => {
  let databasesController: DatabasesController;
  beforeEach(async () => {
    const database: TestingModule = await Test.createTestingModule(
      DatabasesModule.connect(AvaliableLocation.SANDBOX)
    ).compile();
    databasesController = database.get<DatabasesController>(
      DatabasesController
    );
  });
  describe("Get Connection Location", () => {
    it("should return SANDBOX", () => {
      expect(databasesController.getCurrentDatabase()).toBe(
        AvaliableLocation[AvaliableLocation.SANDBOX]
      );
    });
  });
});
