import { IsInt, IsNotEmpty, IsString } from 'class-validator-nestjs';

export class BanUserDto {
  @IsInt({ message: 'Должно быть числом' })
  readonly userId: number;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Причина бана не может быть пустой' })
  readonly banReason: string;
}
