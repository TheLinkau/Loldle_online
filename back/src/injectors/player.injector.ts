import { Sign } from "crypto"
import { Router } from "express"
import { PlayerController } from "../controller/player.controller"
import { RelationalDatabase } from "../infrastructure/database/database"
import { PlayerRepository } from "../repositories/player/player.repository"
import { LoginUseCase } from "../use-cases/login-player.use-case"
import { SignUpUseCase } from "../use-cases/sign-up.use-case"
import { playerRoutes } from "./player.routes"

export const playerInjector = (database: RelationalDatabase): Router => {
    const playerRepo = new PlayerRepository(database)

    const loginUseCase = new LoginUseCase(playerRepo)
    const signUpUseCase = new SignUpUseCase(playerRepo)

    const playerController = new PlayerController(
        loginUseCase,
        signUpUseCase
    )

    return playerRoutes(playerController)
}
