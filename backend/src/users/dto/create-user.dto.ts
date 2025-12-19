import { PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator"
import { MatchPassword } from "src/helpers/matchPassword";

export class CreateUserDto {
    @ApiProperty({
        example: "Jane Doe"
    })
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        example: "example@example.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        example: "Password1!"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
    })
    password: string;

    @ApiProperty({
        example: "Password1!"
    })
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
    'password',
    'email',
]) {}