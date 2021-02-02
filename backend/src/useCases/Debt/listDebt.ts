import { getRepository } from "typeorm";
import { Debt } from "../../model/Debt";

export const listDebt = async (userId?: string) => {
  try {
    console.log("User Id:", userId);
    const repo = getRepository(Debt);
    if (userId) {
      return await repo
        .createQueryBuilder("debt")
        .leftJoinAndSelect("debt.user", "user")
        .where(`user.id = :userId`, { userId })
        .paginate();
    } else {
      return await repo.createQueryBuilder("debt").paginate();
    }
  } catch (e) {
    console.log(e);
  }
};
