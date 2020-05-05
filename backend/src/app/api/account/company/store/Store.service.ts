import Service from "src/app/common/service/Service.factory";
import AccountServiceFactory from "../../Account.factory.txt";
import { AccountType } from "../../Type.interface";
import { StoreDOT } from "./Store.interface";
import Store from "./Store.model";

class StoreService extends Service<typeof Store> {}

export default class extends AccountServiceFactory<StoreDOT>(
  StoreService,
  Store,
  AccountType.STORE
) {}
