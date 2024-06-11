import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentController } from './comment.controller';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { CommentGateway } from './comment.gateway';

@Module({
  providers: [CommentService, CommentGateway],
  controllers: [CommentController],
  imports: [SequelizeModule.forFeature([Comment])],
})
export class CommentModule {}
