import { Router } from "express";
import debt from "./debt";
import user from "./user";
const routes = Router();

routes.get("/", (req, res) => res.send("This is a basic API to manage debts"));

routes.use("/debt", debt);

routes.use("/user", user);

export default routes;
