import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class OrderDto {
  @ApiProperty({
    example: 'The Lord of the Rings',
    description: 'Название книги',
  })
  @IsString({ message: 'Должна быть строка' })
  readonly title: string;

  @ApiProperty({
    example: 'J.R.R. Tolkien',
    description: 'Автор книги',
  })
  @IsString({ message: 'Должна быть строка' })
  readonly authorName: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Адрес электронной почты',
  })
  @IsString({ message: 'Должна быть строка' })
  @IsEmail({}, { message: 'Адрес электронной почты не корректен' })
  readonly email: string;
  id: number;
  bookId: number;
  userId: number;
}
