import { Controller, Get, Query, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  getCaptcha(@Res() res: Response, @Session() session: Record<string, any>) {
    const captcha = this.captchaService.generateCaptcha();
    session.captcha = captcha.text; // Сохраняем captcha в сессии
    console.log(session);

    res.type('svg');
    res.send(captcha.data);
  }

  @Get('verify')
  verifyCaptcha(
    @Query('input') input: string,
    @Session() session: Record<string, any>,
  ): string {
    const isValid = this.captchaService.verifyCaptcha(
      input,
      session.captcha, // Доступ к captcha из сессии
    );

    if (isValid) {
      return 'CAPTCHA verification passed.';
    } else {
      return 'CAPTCHA verification failed.';
    }
  }
}
