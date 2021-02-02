import { Debt } from "../../model/Debt";

export const findDebt = async (id: string) => {
  const debt = await Debt.findOne(id);
  if (debt) {
    return debt;
  }
  return 404;
};
