import { IsEmail, IsNotEmpty, IsString } from 'class-validator-nestjs';

export class CreatePostDto {
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Имя пользователя не может быть пустым' })
  readonly user_name: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly home_page: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Текст не может быть пустым' })
  readonly text: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly url_file: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly file_name: string;
}
