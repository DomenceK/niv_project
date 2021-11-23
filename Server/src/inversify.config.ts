import { Container } from "inversify"
import { Config } from "./Config"
import { Server } from "./Server"
import {  HomeService} from "./services"
import { TYPES } from "./types"

export const container = new Container()
//Server
container.bind<Server>(TYPES.Server).to(Server).inSingletonScope()

// Services

container.bind<HomeService>(TYPES.HomeService).to(HomeService)

//Config
container.bind<Config>(TYPES.Config).to(Config).inSingletonScope()
