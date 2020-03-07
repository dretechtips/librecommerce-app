import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Store from "./Store.model";

@Injectable()
export class StoreService extends Service<typeof Store> {}

export default StoreService;
