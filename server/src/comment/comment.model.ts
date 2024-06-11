import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  user_name: string;

  @Column({ type: DataType.STRING })
  text: string;

  @Column({ type: DataType.STRING, allowNull: false })
  postId: string;
}
