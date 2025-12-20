import { Body, Controller, Get, Post, Req, Res, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

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

  // GOOGLE AUTH
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {

    const user = req.user;

    // Generar JWT
    const token = await this.authService.loginWithGoogle(user);

    return res.redirect(`http://localhost:3000/login/google-callback?token=${token.access_token}`)
  }
  
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    // Devuelve los datos del usuario autenticado
    return await this.usersService.findOne(req.user.id)
  }
}
