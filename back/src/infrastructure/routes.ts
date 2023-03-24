
import { Router } from 'express'
import { Config } from '../config'
import { playerInjector } from '../injectors/player.injector'
import { RelationalDatabase } from './database/database'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRoutes: GetRoutes = (database: RelationalDatabase): Router[] => {
    // Main routes
    return [
        Router().use('/player', playerInjector(database))
    ]
}

export type GetRoutes = (database: RelationalDatabase) => Router[]
