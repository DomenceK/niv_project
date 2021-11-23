import express = require("express");
import "./controllers";
import helmet from "helmet";
import { Container, injectable } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser = require("body-parser");
import { readFileSync } from "fs";
import { join } from "path";
import { createServer } from "http";
import { createServer as createHttpsServer } from "https";

@injectable()
export class Server {
  private isStarted = false;

  public start(
    container: Container,
    port: number | string,
    httpsPort: number | string
  ): void {
    if (this.isStarted) {
      return;
    }

    this.isStarted = true;

    const publicUrl = process.env.PUBLIC_URL || "";

    var jsonPath = join(__dirname, "cert");

    // replace this with your private key
    const privateKey = readFileSync(`${jsonPath}/cert.key`, "utf8");
    // replace this with you certificate
    const certificate = readFileSync(`${jsonPath}/cert.pem`, "utf8");
    const credentials = { key: privateKey, cert: certificate };

    let routingConfig;
    if (publicUrl) {
      routingConfig = {
        rootPath: publicUrl,
      };
    }

    const serverBuilder = new InversifyExpressServer(
      container,
      undefined,
      routingConfig
    );
    serverBuilder.setConfig((app) => {
      app.use(
        helmet({
          contentSecurityPolicy: false,
        })
      );

      app.use(express.urlencoded({ extended: false }));

      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use(bodyParser.json());
    });

    const server = serverBuilder.build();

    const httpServer = createServer(server);
    const httpsServer = createHttpsServer(credentials, server);

    httpServer.listen(port, () => {
      console.log("http server running at " + port);
    });
    httpsServer.listen(httpsPort, () => {
      console.log("https server running at " + httpsPort);
    });
  }
}
