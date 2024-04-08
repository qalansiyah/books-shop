import { ApiProperty } from '@nestjs/swagger';

export class AddBookDto {
  @ApiProperty({
    example: 'The Lord of the Rings',
    description: 'Название книги',
  })
  readonly title: string;

  @ApiProperty({
    example: 'J.R.R. Tolkien',
    description: 'Автор книги',
  })
  readonly authorName: string;
}
