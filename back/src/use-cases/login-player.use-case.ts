import { player } from "@prisma/client"
import { PlayerBadArgumentsException, PlayerBadPWDException, PlayerRepository } from "../repositories/player/player.repository"
import bcrypt from "bcrypt"
import * as jose from "jose"

export class LoginUseCase {
    constructor(private playerRepo: PlayerRepository) { }

    async execute(id: string, mdp: string): Promise<string> {
        if(!(id && mdp)){
            throw new PlayerBadArgumentsException();
        }
        
        const p = await this.playerRepo.getPlayer(id);
        if(!bcrypt.compareSync(mdp, p.mdp)){
            throw new PlayerBadPWDException(id);
        }
        
        //GENERATE JWT
        const secret = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2')
        const alg = 'HS256'
        
        const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('2h')
        .sign(secret)
        
        // console.log(jwt)

        //SEND JWT
        return jwt;
    }
}