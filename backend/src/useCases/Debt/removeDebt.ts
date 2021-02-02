import { Debt } from "../../model/Debt";

export const removeDebt = async (id: string) => {
  const debt = await Debt.findOne(id);
  if (debt) {
    try {
      debt.remove();
      return 200;
    } catch (e) {
      return 500;
    }
  }
  return 404;
};
