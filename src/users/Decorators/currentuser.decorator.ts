import { createParamDecorator , ExecutionContext } from "@nestjs/common";

export const currentUser = createParamDecorator(
    (data: never, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        console.log(request.session.userId);
        return request.currentUser;
    }
)