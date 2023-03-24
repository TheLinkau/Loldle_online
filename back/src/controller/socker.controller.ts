import { Server as SocketIOServer } from 'socket.io';

export class SocketController {
    constructor(private readonly socketIOServer: SocketIOServer) { }

    init(): void {
        this.socketIOServer.on('connection', (socket) => {
            console.log(`Socket ${socket.id} connected.`);

            // Handle accepting invitations
            socket.on('acceptInvitation', (roomId) => {
                // Join the game room
                socket.join(roomId);

                // Send confirmation message to client
                socket.emit('invitationAccepted', roomId);
                this.socketIOServer.to(roomId).emit('roomJoined', "a user has joined the room");
            });

            // Add more event handlers here as needed
        });
    }
}
