import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Box from "./Box.model";

@Injectable()
export class BoxService extends Service<typeof Box> {}

export default BoxService;
