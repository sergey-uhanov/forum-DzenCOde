import { IsInt, IsNotEmpty, IsString } from 'class-validator-nestjs';

export class UpdateCommentDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Имя пользователя не может быть пустым' })
  readonly user_name: string;

  @IsInt({ message: 'Должно быть числом' })
  readonly postId: number;
}
