import { Champion } from "./champion";

export class Session {
  public players: string[];
  public currentPlayer: number;
  public champToGuess: Champion;
  public started:boolean;

  constructor(player:string,champToGuess: Champion ) {
    this.players = [player];
    this.currentPlayer = 0;
    this.started = false;
    this.champToGuess = champToGuess;
  }

  // Add a new player to the session
  addPlayer(playerName: string) {
    this.players.push(playerName);
  }

  // Get the current player name
  getCurrentPlayer(): string {
    return this.players[this.currentPlayer];
  }
  
  getChampToGuess(): Champion{
    return this.champToGuess;
  }

  // Move to the next player
  nextPlayer(): string{
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    return this.getCurrentPlayer();
  }
}
