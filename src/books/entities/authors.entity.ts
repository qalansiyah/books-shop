import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import { Book } from './books.entity';
import { ApiProperty } from '@nestjs/swagger';

interface AuthorCreationAttrs {
  authorName: string;
}

@Table({ tableName: 'authors' })
export class Author extends Model<Author, AuthorCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'J.R.R. Tolkien',
    description: 'Имя автора',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  authorName: string;

  @HasMany(() => Book)
  books: Book[];
}
