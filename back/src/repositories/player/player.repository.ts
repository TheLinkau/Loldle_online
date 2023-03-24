import { player } from "@prisma/client";
import { RelationalDatabase } from "../../infrastructure/database/database";

export class PlayerNotFoundException extends Error {
    constructor(id: string) {
        super(`Player not found for id : ${id}`);
        this.name = 'PlayerNotFoundException';
    }
}

export class PlayerBadPWDException extends Error {
    constructor(id: string) {
        super(`Wrong password provided for id : ${id}`);
        this.name = 'PlayerBadPWDException';
    }
}

export class PlayerBadArgumentsException extends Error {
    constructor() {
        super(`Player provided bad arguments (or missing)`);
        this.name = 'PlayerBadArgumentsException';
    }
}

export class PlayerRepository {

    constructor(private readonly database: RelationalDatabase) { }

    async getPlayer(id: string): Promise<player> {
        const p = await this.database.client.player.findUnique({
            where: { id }
        });
        if (!p) {
            throw new PlayerNotFoundException(id);
        }
        return p;
    }

    async createPlayer(p: player): Promise<player> {
        const createdPlayer = await this.database.client.player.create({
            data: p
        });
        return createdPlayer;
    }
}