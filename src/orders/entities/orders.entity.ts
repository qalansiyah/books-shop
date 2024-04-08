import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/users.entity';
import { Book } from '../../books/entities/books.entity';

interface OrderCreationAttrs {
  id: number;
  userId: number;
  bookId: number;
  authorId: number;
  orderNumber: string;
}
@Table({ tableName: 'orders', createdAt: false, updatedAt: false })
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1000000000',
    description: 'Номер заказа',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  orderNumber: string;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  bookId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => Book)
  book: Book;
  static book: any;
}
