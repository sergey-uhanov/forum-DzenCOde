import { IsOptional, IsString } from 'class-validator-nestjs';

export class UpdatePostDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly user_name?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly text?: string;
}
