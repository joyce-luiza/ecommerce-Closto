import { Router } from "express";
import SaveCommand from "./commands/SaveCommand";

const routes = Router();

routes.post("/users", SaveCommand);

export default routes;
