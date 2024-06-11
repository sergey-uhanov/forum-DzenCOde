import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from '../comment/comment.model';

@Table
export class Reply extends Model<Reply> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  quote: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId: number;

  @BelongsTo(() => Comment)
  comment: Comment;
}
