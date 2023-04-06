import { GetOneChampUseCase } from "../get-champ";
import { Session } from "../../models/session";
import { Result } from "../../models/result";
import { Champion } from "../../models/champion";

export class LogicGameUseCase {
    constructor(
        private readonly getOneChampUseCase: GetOneChampUseCase
    ) { }
    public static listGameSession = new Map<string,Session>();

    async initGameSession(player: string, currentRoomId: string){
        const champTofind = this.getOneChampUseCase.getChampTofind();

        let session = new Session(player, champTofind);

        LogicGameUseCase.listGameSession.set(currentRoomId,session);
    }

    joinGameSession(player: string, currentRoomId: string){
        LogicGameUseCase.listGameSession.get(currentRoomId)?.addPlayer(player);

        LogicGameUseCase.listGameSession.get(currentRoomId)!.started = true;

        return LogicGameUseCase.listGameSession.get(currentRoomId)?.getCurrentPlayer();
    }

    private arraysEqualIgnoreOrder(a: string[], b: string[]): boolean {
        if (a.length !== b.length) {
          return false;
        }
        const sortedA = a.slice().sort();
        const sortedB = b.slice().sort();
        return sortedA.every((value, index) => value === sortedB[index]);
    }

    private arraysHaveCommonElement(a: string[], b: string[]): boolean {
        return a.some(value => b.includes(value));
    }

    nextPlayer(currentRoomId: string): string{
        return LogicGameUseCase.listGameSession.get(currentRoomId)!.nextPlayer();
    }

    start(currentRoomId: string):string{
        return this.nextPlayer(currentRoomId);
    }
    async guess(nameChamp: string, currentRoomId: string){
       let championSelect = this.getOneChampUseCase.getChampSelect(nameChamp);
       let championToGuess = LogicGameUseCase.listGameSession.get(currentRoomId)!.getChampToGuess();

       let res = new Result();
       res.name = championSelect.name;
       res.img = championSelect.img;

       if(championSelect.name == championToGuess?.name){
            res.gender = [1, championSelect.gender];
            res.position = [1, championSelect.position];
            res.species = [1, championSelect.species];
            res.ressource = [1, championSelect.ressource];
            res.RangeType = [1, championSelect.RangeType];
            res.Region = [1, championSelect.Region];
            res.date = [1, championSelect.date];
            //Nouveau champ à def
       }else{
            if(championSelect.gender == championToGuess?.gender){
                res.gender = [1, championSelect.gender];
            }
            else{
                res.gender = [0, championSelect.gender];
            }

            if(this.arraysEqualIgnoreOrder(championSelect.position, championToGuess.position)){
                res.position = [1, championSelect.position];
            }
            else{
                if(this.arraysHaveCommonElement(championSelect.position, championToGuess.position)){
                    res.position = [2, championSelect.position];
                }else{
                    res.position = [0, championSelect.position];
                }
            }

            if(this.arraysEqualIgnoreOrder(championSelect.species, championToGuess.species)){
                res.species = [1, championSelect.species];
            }
            else{
                if(this.arraysHaveCommonElement(championSelect.species, championToGuess.species)){
                    res.species = [2, championSelect.species];
                }else{
                    res.species = [0, championSelect.species];
                }
            }

            if(championSelect.gender == championToGuess?.ressource){
                res.ressource = [1, championSelect.ressource];
            }
            else{
                res.ressource = [0, championSelect.ressource];
            }

            if(this.arraysEqualIgnoreOrder(championSelect.RangeType, championToGuess.RangeType)){
                res.RangeType = [1, championSelect.RangeType];
            }
            else{
                if(this.arraysHaveCommonElement(championSelect.RangeType, championToGuess.RangeType)){
                    res.RangeType = [2, championSelect.RangeType];
                }else{
                    res.RangeType = [0, championSelect.RangeType];
                }
            }

            if(this.arraysEqualIgnoreOrder(championSelect.Region, championToGuess.Region)){
                res.Region = [1, championSelect.Region];
            }
            else{
                if(this.arraysHaveCommonElement(championSelect.Region, championToGuess.Region)){
                    res.Region = [2, championSelect.Region];
                }else{
                    res.Region = [0, championSelect.Region];
                }
            }

            if(championSelect.date == championToGuess?.date){
                res.date = [1, championSelect.date];
            }
            else if(championSelect.date>championToGuess?.date){
                //plus grand
                res.date = [2, championSelect.date];
            }else{
                res.date = [3, championSelect.date];
            }
       }
       return res;
    }
}