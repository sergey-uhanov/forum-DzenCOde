import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RepliesController } from './replies.controller';
import { Reply } from './replies.model';
import { RepliesService } from './replies.service';
import { AppGateway } from './socket.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Reply])],
  providers: [RepliesService, AppGateway],
  controllers: [RepliesController],
})
export class RepliesModule {}
