import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'socket', cors: true })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  logger = new Logger();

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): WsResponse<string> {
    const username = 'User'; // Replace with user authentication logic
    const timestamp = new Date().toLocaleTimeString();

    const response: WsResponse<string> = {
      event: 'message',
      data: `${timestamp} - ${username}: ${message}`,
    };

    this.server.emit('message', response.data); // Broadcast the message to all clients
    return response;
  }
}
