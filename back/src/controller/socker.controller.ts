import { Server as SocketIOServer } from 'socket.io';

export class SocketController {

    constructor(private readonly socketIOServer: SocketIOServer) { }

    public currentRoomId = "string";

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

            // Handle creating room
            socket.on('createRoom', () => {
                // Generate a random short ID for the room
                const roomId = shortid.generate();
                console.log(roomId)

                // Join the game room
                socket.join(roomId);
                this.currentRoomId = roomId;

                // Send id for redirection
                socket.emit('roomCreated', roomId);
            });

            // Add more event handlers here as needed
        });
    }
}
