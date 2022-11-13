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
routes.post("/product", IndexCommand);
routes.get("/products", ConsultCommand);

routes.use(AuthMiddleware);
routes.get("/users", IndexCommand);
routes.patch("/users", UpdateCommand);
routes.delete("/users", DeleteCommand);

routes.post("/user/cards", SaveCommand);
routes.patch("/user/cards", UpdateCommand);
routes.get("/user/cards", ConsultCommand);
routes.delete("/user/cards", DeleteCommand);

routes.post("/user/addresses", SaveCommand);
routes.patch("/user/addresses", UpdateCommand);
routes.get("/user/addresses", ConsultCommand);
routes.delete("/user/addresses", DeleteCommand);

routes.get("/user/orders", ConsultCommand);
routes.post("/user/orders", SaveCommand);
routes.patch("/user/orders", UpdateCommand);

routes.get("/user/coupons", ConsultCommand);

routes.get("/user/exchanges", ConsultCommand);
routes.post("/user/exchanges", SaveCommand);

routes.post("/products", SaveCommand);
routes.patch("/products", UpdateCommand);
routes.delete("/products", DeleteCommand);

routes.get("/orders", ConsultCommand);
routes.post("/order", IndexCommand);
routes.post("/orders", SaveCommand);
routes.patch("/orders", UpdateCommand);
routes.delete("/orders", DeleteCommand);

// routes.get('/coupons', ConsultCommand);
routes.post("/coupons", IndexCommand);
routes.patch("/coupons", UpdateCommand);
routes.delete("/coupons", DeleteCommand);

routes.post("/admin", SaveCommand);
routes.patch("/admin", UpdateCommand);
routes.post("/admin/consult", ConsultCommand);
routes.delete("/admin", DeleteCommand);

export default routes;
