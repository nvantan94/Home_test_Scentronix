import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./dependency-injection/inversify.config"

const server = new InversifyExpressServer(container);
const port = process.env.PORT || 3000;

server.build().listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
