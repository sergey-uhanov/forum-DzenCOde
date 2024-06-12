import { IsInt, IsNotEmpty, IsString } from 'class-validator-nestjs';

export class CreateReplyDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Текст не может быть пустым' })
  readonly text: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  readonly name: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Цитата не может быть пустой' })
  readonly quote: string;

  @IsInt({ message: 'Должно быть числом' })
  readonly commentId: number;
}
