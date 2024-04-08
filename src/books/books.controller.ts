import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './entities/books.entity';
import { AuthorBooksDto } from './dto/author-books.dto';
import { AddBookDto } from './dto/add-book.dto';
import logger from 'src/logger';

@ApiTags('Книги')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  // @ApiOperation({ summary: 'Добавить книгу' })
  // @ApiResponse({ status: 201, type: Book })
  // @Post()
  // async add(@Body() dto: AddBookDto): Promise<Book> {
  //   try {
  //     const book = await this.bookService.add(dto);
  //     return book;
  //   } catch (error) {
  //     logger.error(`Ошибка при добавлении книги: ${error.message}`);
  //     throw error;
  //   }
  // }

  @ApiOperation({ summary: 'Получить книгу по названию' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get('/:title')
  async getByTitle(@Param('title') title: string): Promise<Book> {
    try {
      const books = await this.bookService.getByTitle(title);
      return books;
    } catch (error) {
      logger.error(`Книга не найдена: ${error.message}`);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Получить книгу по автору' })
  @ApiResponse({ status: 200, type: [AuthorBooksDto] })
  @Get('author/:name')
  async getByAuthor(@Param('name') name: string): Promise<Book[]> {
    try {
      const books = await this.bookService.getByAuthor(name);
      return books;
    } catch (error) {
      logger.error(`Автор не найден: ${error.message}`);
      throw error;
    }
  }
}
