import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentGateway } from './comment.gateway';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentGateway: CommentGateway,
  ) {}

  @Get()
  async getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get('/postid')
  async getComments(
    @Query('postId') postId: number,
    @Query('sort') sort: string,
  ) {
    return this.commentService.getCommentsByPostId(postId, sort);
  }

  @Get(':id')
  async getCommentById(@Param('id') id: number) {
    return this.commentService.getCommentById(id);
  }
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentService.createComment(createCommentDto);
    this.commentGateway.server.emit('newComment', comment);
    return comment;
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
