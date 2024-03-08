import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, { cors: '*', namespace: 'user' })
export class EventsGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  logger = new Logger();

  async handleConnection(client: Socket): Promise<void> {
    const socketId = client.id;
    this.addClient(socketId);
  }

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() message: string) {
    this.server.sockets.emit('receive_message', message);
  }

  addClient(socketId: string) {
    throw new Error('Method not implemented.');
  }
  handleDisconnect(client: any) {
    throw new Error('Method not implemented.');
  }
}
