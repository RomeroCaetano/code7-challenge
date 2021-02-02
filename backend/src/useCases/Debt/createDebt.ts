import { Debt, IDebt } from "../../model/Debt";
import { User } from "../../model/User";
export const createDebt = async (userId: string, props: Omit<IDebt, "id">) => {
  const user = await User.findOne(
    { id: parseInt(userId) },
    { relations: ["debts"] }
  );
  if (user) {
    try {
      const debt = new Debt();
      Object.assign(debt, props);
      await debt.save();

      if (user.debts) user.debts.push(debt);
      else user.debts = [debt];
      await user.save();

      return debt;
    } catch (e) {
      console.log(e);
    }
  }
  return 404;
};
