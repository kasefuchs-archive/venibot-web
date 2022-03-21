import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("guilds")
export class Guild {
  @PrimaryColumn({ type: "bigint", name: "guild_id", nullable: false })
  id!: string;
  @Column({ type: "boolean", name: "audit_enabled", nullable: true })
  audit_enabled!: boolean;
  @Column({ type: "varchar", name: "timezone", nullable: true })
  timezone!: string;
  @Column({
    type: "varchar",
    name: "command_locale",
    nullable: true,
  })
  command_locale!: string;
  @Column({ type: "varchar", name: "locale", nullable: true })
  locale!: string;
  @Column({ type: "boolean", name: "is_active", nullable: false })
  active!: boolean;
  @Column({ type: "varchar", name: "prefix", nullable: false, length: 5 })
  prefix!: boolean;
}
