import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/users.entity';
import { Order } from '../../orders/entities/orders.entity';
import { Author } from './authors.entity';

interface BookCreationAttrs {
  title: string;
  authorId: number;
}

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttrs> {
  //@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'The Lord of the Rings',
    description: 'Название книги',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @BelongsToMany(() => User, () => Order)
  users: User[];

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @BelongsTo(() => Author)
  author: Author;
  bookId: number;
  static title: any;
  static author: any;
}
