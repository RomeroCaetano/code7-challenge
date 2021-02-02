import { getManager } from "typeorm";
import { User } from "../../model/User";

export const removeUser = async (id: string) => {
  try {
    return await getManager().transaction(async (manager) => {
      const user = await User.findOne(
        { id: parseInt(id) },
        { relations: ["address", "company"] }
      );
      if (user) {
        manager.remove(user.address);
        manager.remove(user.company);
        manager.remove(user);
        return 200;
      }
      return 404;
    });
  } catch (e) {
    return 500;
  }
};
