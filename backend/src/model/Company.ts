import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  name!: string;
  @Column()
  catchPhrase!: string;
  @Column()
  bs!: string;
}
export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
