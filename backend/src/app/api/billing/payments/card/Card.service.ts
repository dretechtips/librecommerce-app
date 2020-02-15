import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Card from "./Card.model";

@Injectable()
export class CardService extends Service<Card> {
  constructor() {
    super(Card);
  }
}

export default CardService;
