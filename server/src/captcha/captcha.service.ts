import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  generateCaptcha() {
    const captcha = svgCaptcha.create({
      size: 1, // количество символов
      ignoreChars: '0o1i', // исключаемые символы
      noise: 0, // количество линий помех
      color: true, // цветной текст
      background: '#cc9966', // цвет фона
    });

    return {
      text: captcha.text,
      data: captcha.data,
    };
  }

  verifyCaptcha(input: string, expected: string): boolean {
    return input == expected;
  }
}
