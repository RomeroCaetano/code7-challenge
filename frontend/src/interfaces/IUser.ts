import IAddress from "./IAddress";
import ICompany from "./ICompany";
import IDebt from "./IDebt";

export default interface IUser {
  _id: string;
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
  debts: IDebt[];
}
