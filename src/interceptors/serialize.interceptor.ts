import { UseInterceptors , NestInterceptor , ExecutionContext , CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToInstance } from "class-transformer";

interface ClassConstructor {
    new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
  //running before the route handler is executed
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        //Run something before a request is handled
      return handler.handle().pipe(
        map(data => {
          return plainToInstance(this.dto, data, {
            excludeExtraneousValues: true
          }) 
        })
      )
      //Run something before the response is sent out
    }
    //running after the route handler is executed
  }