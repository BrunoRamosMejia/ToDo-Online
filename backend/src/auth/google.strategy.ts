import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { emails, displayName, photos } = profile;
        const email = emails[0].value;

        // BUSCAR USER POR EMAIL
        let user = await this.usersService.findByEmail(email);

        if (!user) {
            user = await this.authService.createWithGoogle({
                name: displayName,
                email,
                profileImg: photos[0]?.value,
            });
        }

        done(null, user);
    }
}