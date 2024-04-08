import { ApiProperty } from '@nestjs/swagger';
import { AddBookDto } from './add-book.dto';
import { Author } from '../entities/authors.entity';

export class AuthorBooksDto {
  @ApiProperty({ example: 'The Lord of the Rings' })
  title: string;

  @ApiProperty({ type: Author })
  author: AddBookDto;
}
