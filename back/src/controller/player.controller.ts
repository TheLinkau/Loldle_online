import { Request, Response } from "express";
import { PlayerBadArgumentsException, PlayerBadPWDException, PlayerNotFoundException } from "../repositories/player/player.repository";
import { LoginUseCase } from "../use-cases/login-player.use-case";
import { SignUpUseCase } from "../use-cases/sign-up.use-case";
import { player } from "@prisma/client"
import { Prisma } from "@prisma/client";

export class PlayerController {

    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly signUpUseCase: SignUpUseCase
    ) { }

    async login(req: Request, res: Response) {
        const { id, mdp } = req.body;
        
        try {
            const jwt = await this.loginUseCase.execute(id, mdp);
            res.cookie("jwt", jwt);
            res.status(200).send();
        } catch (e) {
            if (e instanceof PlayerBadArgumentsException) {
                // console.log(e.message);
                res.status(400).json({"error":e.message});
            }else if (e instanceof PlayerNotFoundException) {
                // console.log(e.message);
                res.status(404).json({"error":e.message});
            }else if (e instanceof PlayerBadPWDException) {
                // console.log(e.message);
                res.status(401).json({"error":e.message});
            } else {
                res.status(500).json({"error":"une erreur interne non geree s'est produite"});
                throw e;
            }
        }
    }

    async sign_up(req: Request, res: Response) {
        // console.log("PlayerController::sign_up body: ",req.body);
        const { id, mdp, pseudo } = req.body;

        const newPlayer: player = { id, mdp, pseudo };
        
        try {
            const playerReturned = await this.signUpUseCase.execute(newPlayer);
            res.status(200).json(playerReturned);
        } catch (e) {
            if (e instanceof PlayerBadArgumentsException) {
                // console.log(e.message);
                res.status(400).json({"error":e.message});
            } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // console.log(e.message);
                res.status(400).json({"error":"un joueur a deja cet id"});
            } else {
                res.status(500).json({"error":"une erreur interne non geree s'est produite"});
                throw e;
            }
        }
    }
}