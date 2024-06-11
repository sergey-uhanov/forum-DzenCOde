import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async getAllComments() {
    const posts = await this.commentRepository.findAll();
    return posts;
  }
  async getCommentsByPostId(postId: number, sort: string) {
    const order = this.parseSortOrder(sort);
    const comments = await this.commentRepository.findAll({
      where: { postId },
      order,
    });

    return comments;
  }

  parseSortOrder(sort: string): Order {
    const [key, order] = sort.split('-');
    console.log(key, order);

    const sequelizeOrder = order === 'asc' ? 'ASC' : 'DESC';

    switch (key) {
      case 'user_name':
        return [['user_name', sequelizeOrder]] as Order;
      case 'email':
        return [['email', sequelizeOrder]] as Order;
      case 'date':
        return [['createdAt', sequelizeOrder]] as Order;
      default:
        return [['createdAt', 'DESC']] as Order;
    }
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepository.findAll({
      where: { postId: id },
    });

    return comment;
  }

  async createComment(comment: CreateCommentDto) {
    const newComment = await this.commentRepository.create(comment);
    return newComment;
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const [numberOfAffectedRows, [updatedComment]] =
      await this.commentRepository.update(updateCommentDto, {
        where: { id },
        returning: true,
      });

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return updatedComment;
  }

  async deleteComment(id: number) {
    const numberOfDeletedRows = await this.commentRepository.destroy({
      where: { id },
    });

    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return { deleted: true };
  }
}
