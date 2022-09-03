import { Router } from "express";

import SaveCommand from "./commands/SaveCommand";
import UpdateCommand from "./commands/UpdateCommand";
import DeleteCommand from "./commands/DeleteCommand";
import IndexCommand from "./commands/IndexCommand";

const routes = Router();

routes.post("/users", SaveCommand);
routes.get("/users", IndexCommand);
routes.patch("/users", UpdateCommand);
routes.delete("/users", DeleteCommand);

export default routes;
