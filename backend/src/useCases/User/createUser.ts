import { Address } from "../../model/Address";
import { Company } from "../../model/Company";
import { User, IUser } from "../../model/User";
import { getManager } from "typeorm";

export const createUser = async (props: Omit<IUser, "_id">) => {
  try {
    return await getManager().transaction(async (manager) => {
      //Creating Dependencies
      let address = new Address();
      Object.assign(address, { ...props.address });
      address = await manager.save(address);

      let company = new Company();
      Object.assign(company, props.company);
      company = await manager.save(company);

      const user = new User();
      Object.assign(user, { ...props, address, company, debts: [] });
      await manager.save(user);

      return user;
    });
  } catch (e) {
    console.log(e);
  }
};
