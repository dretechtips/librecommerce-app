import { Injectable } from "@nestjs/common";
import Service from "../../../sale/account/type/customer/node_modules/src/app/common/service/Service.factory";
import Card from "./Card.model";

@Injectable()
export class CardService extends Service<Card> {
  constructor() {
    super(Card);
  }
}

export default CardService;
