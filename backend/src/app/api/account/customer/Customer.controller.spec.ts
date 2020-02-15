import CustomerController from "./Customer.controller";
import { Test, TestingModule } from "@nestjs/testing";
import CustomerService from "./Customer.service";

describe("CustomerController", () => {
  let customerController: CustomerController;
  beforeEach(async () => {
    const customer: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService]
    }).compile();
    customerController = customer.get(CustomerController);
  });

  describe("create", () => {
    it("should return customer ID", () => {});
  });
});
