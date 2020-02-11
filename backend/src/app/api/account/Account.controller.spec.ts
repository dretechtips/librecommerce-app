import AccountController from "./Account.controller";
import { TestingModule, Test } from "@nestjs/testing";
import AccountModule from "./Account.module";
import AccountService from "./Account.service";

describe("AccountController", () => {
  let accountController: AccountController;
  beforeEach(async () => {
    const account: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService]
    }).compile();
    accountController = account.get(AccountController);
  });
});
