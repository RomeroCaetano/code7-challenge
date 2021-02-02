import { Request, Response } from "express";
import { editDebt } from "../useCases/Debt/editDebt";
import { findDebt } from "../useCases/Debt/findDebt";
import { removeDebt } from "../useCases/Debt/removeDebt";
import { createDebt } from "../useCases/Debt/createDebt";
import { listDebt } from "../useCases/Debt/listDebt";
class DebtController {
  async list(req: Request, res: Response) {
    const debtList = await listDebt(req.params.userId);
    if (debtList) {
      return res.status(200).send(debtList);
    }
    res.status(500).send();
  }
  async create(req: Request, res: Response) {
    console.log(req.body);
    const debt = await createDebt(req.params.userId, req.body);
    if (debt) {
      return res.status(200).send(debt);
    }
    res.status(500).send();
  }
  async edit(req: Request, res: Response) {
    // console.log(req);
    const debt = await editDebt(req.params.id, req.body);
    if (typeof debt === "number") {
      return res.status(debt).send();
    } else if (debt) {
      return res.status(200).send(debt);
    }
    res.status(500).send();
  }
  async findOne(req: Request, res: Response) {
    const debt = await findDebt(req.params.id);
    if (typeof debt === "number") {
      return res.status(debt).send();
    } else if (debt) {
      return res.status(200).send(debt);
    }
    res.status(500).send();
  }
  async remove(req: Request, res: Response) {
    const removedStatus = await removeDebt(req.params.id);
    return res.status(removedStatus).send();
  }
}
export default DebtController;
