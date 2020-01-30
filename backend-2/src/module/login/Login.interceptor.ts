import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe();
  }
}
