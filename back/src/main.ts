
import { config } from './config';
import { RelationalDatabase } from './infrastructure/database/database';
import { Server } from './infrastructure/server';

(async () => {
    process.on('unhandledRejection', err => {
        // eslint-disable-next-line no-console
        console.log(err)
        process.exit(1)
    })

    const database = new RelationalDatabase(config)

    const server: Server = new Server(config)
    await server.init(database)

    await server.start()
})()
