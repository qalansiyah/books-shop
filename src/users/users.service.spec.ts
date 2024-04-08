import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './entities/users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(), // Оставляем пустым
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUserModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Остальной код не изменяется
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' },
      ];

      // Создаем мок для метода findAll, чтобы он возвращал массив объектов User
      jest.spyOn(mockUserModel, 'findAll').mockResolvedValue(mockUsers as any);

      const result = await service.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(mockUserModel.findAll).toHaveBeenCalled();
    });
  });
});
