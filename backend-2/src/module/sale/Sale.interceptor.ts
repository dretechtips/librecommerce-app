import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import path from "path";

export class CreateSaleInterceptors implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    
  }
  private path = "create";
}