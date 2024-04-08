import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from './entities/books.entity';
import { Author } from './entities/authors.entity';

describe('BooksService', () => {
  let service: BooksService;
  let bookRepository: typeof Book;
  let authorRepository: typeof Author;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book),
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(Author),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepository = module.get<typeof Book>(getModelToken(Book));
    authorRepository = module.get<typeof Author>(getModelToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add', () => {
    it('should create a new book', async () => {
      const dto = { title: 'Test Book', authorName: 'Test Author' };
      const author = { id: 1, authorName: 'Test Author' };
      const book = { id: 1, title: 'Test Book', authorId: 1 };

      (authorRepository.findOne as jest.Mock).mockResolvedValueOnce(null);
      (authorRepository.create as jest.Mock).mockResolvedValueOnce(author);
      (bookRepository.create as jest.Mock).mockResolvedValueOnce(book);

      const result = await service.add(dto);

      expect(authorRepository.findOne).toHaveBeenCalledWith({
        where: { authorName: dto.authorName },
      });
      expect(authorRepository.create).toHaveBeenCalledWith({
        authorName: dto.authorName,
      });
      expect(bookRepository.create).toHaveBeenCalledWith({
        title: dto.title,
        authorId: author.id,
      });
      expect(result).toEqual(book);
    });
  });

  describe('getbyTitle', () => {
    it('should return a book by its title', async () => {
      const title = 'Test Book';
      const book = { id: 1, title: 'Test Book' };

      (bookRepository.findOne as jest.Mock).mockResolvedValueOnce(book);

      const result = await service.getbyTitle(title);

      expect(bookRepository.findOne).toHaveBeenCalledWith({ where: { title } });
      expect(result).toEqual(book);
    });
  });

  describe('getByAuthor', () => {
    it('should return books by author name', async () => {
      const authorName = 'Test Author';
      const books = [
        { id: 1, title: 'Test Book 1' },
        { id: 2, title: 'Test Book 2' },
      ];

      (bookRepository.findAll as jest.Mock).mockResolvedValueOnce(books);

      const result = await service.getByAuthor(authorName);

      expect(bookRepository.findAll).toHaveBeenCalledWith({
        include: [{ association: 'author', where: { authorName } }],
      });
      expect(result).toEqual(books);
    });
  });
});
