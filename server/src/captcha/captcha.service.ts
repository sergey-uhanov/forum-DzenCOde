import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  generateCaptcha() {
    const captcha = svgCaptcha.create({
      //Настройка каптчи
      size: 5, // количество символов
      ignoreChars: '0o1icCPpZzXxVv', // исключаемые символы
      noise: 5, // количество линий помех
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
