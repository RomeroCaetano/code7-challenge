import { DateTime } from "luxon";
import { UTCDateColumn } from "../util/utc-date.decorator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
interface IDebt {
  id: string;
  description: string;
  value: string;
  date: DateTime;
}
@Entity()
class Debt extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  description!: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  value!: number;

  @UTCDateColumn({ default: (): string => "LOCALTIMESTAMP" })
  date: Date = new Date();

  @ManyToOne((_) => User, (user) => user.debts)
  user!: User;
}
export { IDebt, Debt };
