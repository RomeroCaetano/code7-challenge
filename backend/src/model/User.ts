import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Company } from "./Company";
import { Debt } from "./Debt";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id!: string;
  @Column()
  id!: number;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @OneToOne((_) => Address, (address) => address.id, { onDelete: "CASCADE" })
  @JoinColumn()
  address!: Address;

  @Column()
  phone!: string;

  @Column()
  website!: string;

  @OneToOne((_) => Company, (company) => company.id, { onDelete: "CASCADE" })
  @JoinColumn()
  company!: Company;

  @OneToMany((_) => Debt, (debt) => debt.user)
  debts!: Debt[];
}

export interface IUser {
  _id: string;
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
