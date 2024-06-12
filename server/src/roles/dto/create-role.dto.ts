import { IsString, IsNotEmpty } from 'class-validator-nestjs';

export class CreateRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Значение роли не может быть пустым' })
  readonly value: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  readonly description: string;
}
