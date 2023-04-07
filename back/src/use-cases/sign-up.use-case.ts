import { player } from "@prisma/client"
import { PlayerBadArgumentsException, PlayerRepository } from "../repositories/player/player.repository"
import bcrypt from "bcrypt"

export class SignUpUseCase {
    constructor(private playerRepo: PlayerRepository) { }

    async execute(p: player): Promise<player> {
        if(!(p.id && p.mdp && p.pseudo)){
            throw new PlayerBadArgumentsException();
        }

        const salt = bcrypt.genSaltSync(10);
        p.mdp = bcrypt.hashSync(p.mdp, salt);

        return this.playerRepo.createPlayer(p);
    }
}