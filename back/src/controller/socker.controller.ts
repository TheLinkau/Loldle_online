import { Server as SocketIOServer } from 'socket.io';
import { GetOneChampUseCase } from "../use-cases/get-champ";
import { LogicGameUseCase } from "../use-cases/logic-game";
import shortid from 'shortid';

export class SocketController {
    constructor(
        private readonly socketIOServer: SocketIOServer,
        private readonly getOneChampUseCase: GetOneChampUseCase,
        private readonly logicGameUseCase: LogicGameUseCase

    ) { }
    public currentRoomId = "";
    public currentPlayer: string = "";
    public connected = false;

    init(): void {
        this.socketIOServer.on('connection', (socket) => {
            console.log(`Socket ${socket.id} connected.`);

            if (socket.handshake.query.token && typeof socket.handshake.query.token === "string") {
                // TODO add a check of the token (public key ?)
                socket.emit('connected', true)
                this.connected = true;
                this.currentPlayer = socket.handshake.query.token.slice(0, 5);
            } else {
                socket.emit('connected', false)
                this.connected = false;
            }

            // Handle creating room
            socket.on('createRoom', () => {
                if (!this.connected) {
                    socket.emit('disconnected')
                } else {
                    // Generate a random short ID for the room
                    const roomId = shortid.generate();

                    // Create game
                    this.logicGameUseCase.initGameSession(this.currentPlayer, roomId)

                    // Join the game room
                    socket.join(roomId);
                    this.currentRoomId = roomId;

                    // Send id for redirection
                    socket.emit('roomCreated', roomId);
                }
            });
            
            socket.on('Start', () => {
                const nextPlayer = this.logicGameUseCase.start(this.currentRoomId);

                // Send confirmation message to client
                socket.emit('nextPlayer', nextPlayer)
            });

            socket.on('ChampSelect', (Champ) => {
                // Get the champ
                const res = this.logicGameUseCase.guess(Champ, this.currentRoomId);
                const currentPlayer =  this.logicGameUseCase.nextPlayer(this.currentRoomId);
                // Send confirmation message to client
                socket.emit('feedbackChamp', res);
                socket.emit('nextPlayer', currentPlayer);
                this.socketIOServer.to(this.currentRoomId).emit('roomJoined', "a user has joined the room");
            });



            // Add more event handlers here as needed
        });
    }
}
