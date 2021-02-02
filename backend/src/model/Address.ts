import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  street!: string;
  @Column()
  suite!: string;
  @Column()
  city!: string;
  @Column()
  zipcode!: string;
  @Column("json", { default: {} })
  geo!: Geo;
}
export interface IAddress extends BaseEntity {
  id: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface Geo {
  lat: string;
  lng: string;
}
