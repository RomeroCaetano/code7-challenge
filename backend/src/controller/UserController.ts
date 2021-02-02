import { Request, Response } from "express";
import { editUser } from "../useCases/User/editUser";
import { findUser } from "../useCases/User/findUser";
import { removeUser } from "../useCases/User/removeUser";
import { createUser } from "../useCases/User/createUser";
import { listUser } from "../useCases/User/listUser";
import { populateUsers } from "../util/getUsers";
class UserController {
  async list(_: Request, res: Response) {
    let userList = await listUser();

    await populateUsers(userList);

    if (userList) {
      return res.status(200).send(userList);
    }
    res.status(500).send();
  }
  async create(req: Request, res: Response) {
    // console.log(req);
    const user = await createUser(req.body);
    if (user) {
      return res.status(200).send(user);
    }
    res.status(500).send();
  }
  async edit(req: Request, res: Response) {
    // console.log(req);
    const user = await editUser(req.params.id, req.body);
    if (typeof user === "number") {
      return res.status(user).send();
    } else if (user) {
      return res.status(200).send(user);
    }
    res.status(500).send();
  }
  async findOne(req: Request, res: Response) {
    const user = await findUser(req.params.id);
    if (typeof user === "number") {
      return res.status(user).send();
    } else if (user) {
      return res.status(200).send(user);
    }
    res.status(500).send();
  }
  async remove(req: Request, res: Response) {
    const removedStatus = await removeUser(req.params.id);
    return res.status(removedStatus).send();
  }
}

export default UserController;
