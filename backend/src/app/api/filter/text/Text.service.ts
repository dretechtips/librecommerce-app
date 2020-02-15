import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";

@Injectable()
export class TextService extends Service<Text> {}
