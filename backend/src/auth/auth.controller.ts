import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER USER ENDPOINT
  @Post('register')
  async registerUser(@Body() CreateUserDto: CreateUserDto) {
    return await this.authService.register(CreateUserDto);
  }

  // LOGIN USER ENDPOINT
  @Post('login')
  async loginUser(@Body() credentials: LoginUserDto) {
    return await this.authService.login(credentials);
  }
}
