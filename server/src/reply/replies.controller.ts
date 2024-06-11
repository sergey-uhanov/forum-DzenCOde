import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply';
import { Reply } from './replies.model';
import { RepliesService } from './replies.service';
import { AppGateway } from './socket.gateway';

@Controller('replies')
export class RepliesController {
  constructor(
    private readonly repliesService: RepliesService,
    private readonly replyGateway: AppGateway,
  ) {}

  @Post()
  async create(@Body() createReplyDto: CreateReplyDto): Promise<Reply> {
    const reply = this.repliesService.create(createReplyDto);
    this.replyGateway.server.emit('newReply', reply);
    return reply;
  }
  @Get(':commentId')
  async findAllByComment(
    @Param('commentId') commentId: number,
  ): Promise<Reply[]> {
    return this.repliesService.findAllByComment(commentId);
  }
}
