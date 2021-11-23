import "reflect-metadata"
import { Config } from "./Config"
import { container } from "./inversify.config"
import { Server } from "./Server"
import { TYPES } from "./types"

// tslint:disable-next-line:ordered-imports
import dotenv = require("dotenv")

if (process.env.NODE_ENV !== "production") {
    const result = dotenv.config()
    if (result.error) {
        throw result.error
    }
}

const startup = async () => {
    const config = container.get<Config>(TYPES.Config)
    const server = container.get<Server>(TYPES.Server)
    server.start(container, config.port, config.httpsPort)
}

startup().catch((e) => {
    console.error(e)
    process.exit()
})
