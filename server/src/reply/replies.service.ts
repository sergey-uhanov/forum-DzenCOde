import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reply } from './replies.model';
import { CreateReplyDto } from './dto/create-reply';

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel(Reply)
    private readonly replyModel: typeof Reply,
  ) {}

  async create(createReplyDto: CreateReplyDto): Promise<Reply> {
    return this.replyModel.create(createReplyDto);
  }

  async findAllByComment(commentId: number): Promise<Reply[]> {
    return this.replyModel.findAll({ where: { commentId } });
  }
}
