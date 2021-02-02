import { Router } from "express";
import DebtController from "../controller/DebtController";

const router = Router();
const controller = new DebtController();
router.get("/", controller.list);

router.get("/user/:userId", controller.list);

router.post("/user/:userId", controller.create);

router.put("/:id", controller.edit);

router.get("/:id", controller.findOne);

router.delete("/:id", controller.remove);

export default router;
