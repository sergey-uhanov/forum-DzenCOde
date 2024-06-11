import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(userDto);
    res.cookie('token', token, { httpOnly: true, secure: true }); // Устанавливаем токен в HttpOnly cookie
    res.send({ user });
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const { token, user } = await this.authService.registration(userDto);
    res.cookie('token', token, { httpOnly: true, secure: true }); // Устанавливаем токен в HttpOnly cookie
    res.send({ user });
  }
  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.send({ message: 'Logged out successfully' });
  }
}
