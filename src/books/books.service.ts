import { Injectable } from '@nestjs/common';
import { AddBookDto } from './dto/add-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './entities/books.entity';
import { Author } from './entities/authors.entity';
import logger from 'src/logger';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private bookRepository: typeof Book,
    @InjectModel(Author) private authorRepository: typeof Author,
  ) {}

  async add(dto: AddBookDto) {
    try {
      let author = await this.authorRepository.findOne({
        where: { authorName: dto.authorName },
      });

      if (!author) {
        author = await this.authorRepository.create({
          authorName: dto.authorName,
        });
      }
      const book = await this.bookRepository.create({
        title: dto.title,
        authorId: author.id,
      });
      return book;
    } catch (error) {
      logger.error(`Ошибка при добавлении книги: ${error.message}`);
      throw error;
    }
  }

  async getByTitle(title: string) {
    try {
      const book = await this.bookRepository.findOne({
        where: { title },
      });
      return book;
    } catch (error) {
      logger.error(`Ошибка при получении книги по названию: ${error.message}`);
      throw error;
    }
  }

  async getByAuthor(authorName: string) {
    try {
      const books = await this.bookRepository.findAll({
        include: [{ association: 'author', where: { authorName } }],
      });
      return books;
    } catch (error) {
      logger.error(`Ошибка при получении книг по автору: ${error.message}`);
      throw error;
    }
  }
}
