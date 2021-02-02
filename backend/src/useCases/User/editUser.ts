import { Company } from "../../model/Company";
import { getManager } from "typeorm";
import { Address } from "../../model/Address";
import { User, IUser } from "../../model/User";

export const editUser = async (
  id: string,
  props: Omit<IUser, "_id" | "id">
) => {
  try {
    return await getManager().transaction(async (manager) => {
      const user = await User.findOne({ id: parseInt(id) });
      if (user) {
        const address = await Address.findOne(user.address.id);
        Object.assign(address, props.address);
        await manager.save(address);

        const company = await Company.findOne(user.company.id);
        Object.assign(company, props.company);
        await manager.save(company);

        Object.assign(user, { ...props, address, company });
        await manager.save(user);
        return user;
      }
      return 404;
    });
  } catch (e) {
    console.log(e);
    return 400;
  }
};
