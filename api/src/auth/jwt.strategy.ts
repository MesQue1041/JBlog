import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { request } from "http";
import { Request } from "express";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
        super({
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }])


        });
    }

    async validate(payload: any, req: Request) {
        if (!payload) {
            throw new UnauthorizedException();
        }
        const user = await this.repo.findOne({
            where: { email: payload.email },
          });

          req.user = user;
          return req.user;

    }
}