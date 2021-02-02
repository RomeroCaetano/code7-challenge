import { IUser } from "../model/User";
import fetch from "node-fetch";
import { createUser } from "../useCases/User/createUser";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};
export const populateUsers = async (
  userList: PaginationAwareObject | undefined
) => {
  if (userList?.data.length === 0) {
    const users: Omit<IUser, "_id">[] = await getUsers();
    const reqs = users.map(async (usr) => {
      return await createUser(usr);
    });
    await Promise.all(reqs);
  }
};
