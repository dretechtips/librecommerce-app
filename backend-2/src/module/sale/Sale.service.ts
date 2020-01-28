import { Injectable, Scope } from "@nestjs/common";
import { Request, Response } from "express";
import TagService from "src/common/services/Tag.service";
import { SaleObject } from "./Sale.interface";
import Order from "../order/Order.model";

@Injectable()
export class SaleService {
  constructor() {
    
  }
}
