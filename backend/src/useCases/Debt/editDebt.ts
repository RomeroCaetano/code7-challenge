import { Debt, IDebt } from "../../model/Debt";

export const editDebt = async (id: string, props: Omit<IDebt, "id">) => {
  const debt = await Debt.findOne(id);
  if (debt) {
    Object.assign(debt, props);
    try {
      await debt.save();
      return debt;
    } catch (e) {
      console.log(e);
    }
  }
  return 404;
};
