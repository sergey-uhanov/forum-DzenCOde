import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateReplyDto } from './dto/create-reply';
import { RepliesService } from './replies.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly repliesService: RepliesService) {}

  @SubscribeMessage('newReply')
  async handleNewReply(client: Socket, payload: CreateReplyDto): Promise<void> {
    console.log(111111111111111111111111);
    const reply = await this.repliesService.create(payload);

    this.server.emit('newReply', reply);
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
