import { User } from "../../model/User";

export const findUser = async (id: string) => {
  try {
    const user = await User.findOne(
      { id: parseInt(id) },
      { relations: ["address", "company"] }
    );
    if (user) {
      return user;
    }
  } catch (e) {
    console.log(e);
    return 400;
  }
  return 404;
};
