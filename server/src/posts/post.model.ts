import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from '../comment/comment.model';

@Table({ tableName: 'posts' })
export class Post extends Model<Post> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  user_name: string;

  @Column({ type: DataType.STRING })
  home_page: string;

  @Column({ type: DataType.STRING })
  file_name: string;

  @Column({ type: DataType.STRING })
  url_file: string;

  @Column({ type: DataType.TEXT })
  text: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
