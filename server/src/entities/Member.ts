import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("members")
export class Member {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint" })
  __id!: number;

  @Column({ type: "bigint", name: "guild_id", nullable: false })
  guild_id!: string;

  @Column({ type: "bigint", name: "member_id", nullable: false })
  id!: string;
}
