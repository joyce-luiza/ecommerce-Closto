import { Router } from "express";

import SaveCommand from "./commands/SaveCommand";
import UpdateCommand from "./commands/UpdateCommand";
import DeleteCommand from "./commands/DeleteCommand";
import IndexCommand from "./commands/IndexCommand";
import AuthMiddleware from "./middlewares/AuthMiddleware";

const routes = Router();

routes.post("/users", SaveCommand);
routes.post("/session", SaveCommand);

routes.use(AuthMiddleware);
routes.get("/users", IndexCommand);
routes.patch("/users", UpdateCommand);
routes.delete("/users", DeleteCommand);

routes.post("/user/cards", SaveCommand);

export default routes;
