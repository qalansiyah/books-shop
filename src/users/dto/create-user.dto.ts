import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Адрес электронной почты',
  })
  @IsString({ message: 'Должна быть строка' })
  @IsEmail({}, { message: 'Адрес электронной почты не корректен' })
  readonly email: string;
}
