import { Router } from "express";

import SaveCommand from "./commands/SaveCommand";
import UpdateCommand from "./commands/UpdateCommand";
import DeleteCommand from "./commands/DeleteCommand";
import IndexCommand from "./commands/IndexCommand";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import ConsultCommand from "./commands/ConsultCommand";

const routes = Router();

routes.post("/users", SaveCommand);
routes.post("/session", SaveCommand);

routes.use(AuthMiddleware);
routes.get("/users", IndexCommand);
routes.patch("/users", UpdateCommand);
routes.delete("/users", DeleteCommand);

routes.post("/user/cards", SaveCommand);
routes.patch("/user/cards", UpdateCommand);
routes.get("/user/cards", ConsultCommand);
routes.delete("/user/cards", DeleteCommand);

export default routes;
