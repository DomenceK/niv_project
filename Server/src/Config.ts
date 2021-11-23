import { injectable } from "inversify"

@injectable()
export class Config {
    public readonly port: number
    public readonly httpsPort: number
    public readonly publicUrl: string

    constructor() {
        this.port = parseInt(process.env.PORT || "8000", 10)
        this.httpsPort = parseInt(process.env.HTTPSPORT || "8443", 10)
        this.publicUrl = process.env.PUBLIC_URL || ""
    }
}
