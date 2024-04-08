import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Book } from 'src/books/entities/books.entity';
import { Order } from 'src/orders/entities/orders.entity';

interface UserCreationAttrs {
  email: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  //@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Адрес электронной почты',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  email: string;

  @BelongsToMany(() => Book, () => Order)
  books: User[];
}
