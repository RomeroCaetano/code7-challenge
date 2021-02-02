import { User } from "../../model/User";
import { getRepository } from "typeorm";

export const listUser = async () => {
  try {
    const repo = getRepository(User);
    console.log(repo);
    const users = await repo
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.address", "address")
      .innerJoinAndSelect("user.company", "company")
      .leftJoinAndSelect("user.debts", "debts")
      .orderBy("user.name", "ASC")
      .paginate();
    users.data = users.data.map((user: User) =>
      Object.assign({}, user, { _id: undefined })
    );
    return users;
  } catch (e) {
    console.log(e);
  }
};
