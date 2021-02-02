import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();
const controller = new UserController();
router.get("/", controller.list);

router.post("/", controller.create);

router.put("/:id", controller.edit);

router.get("/:id", controller.findOne);

router.delete("/:id", controller.remove);

export default router;
