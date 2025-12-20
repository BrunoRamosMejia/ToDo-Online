import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if (!authorization) throw new UnauthorizedException('No Token provided');

        const token = authorization.split(' ')[1];
        if (!token) throw new UnauthorizedException('Invalid Token Format');

        try {
            const user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            request.user = user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }
}