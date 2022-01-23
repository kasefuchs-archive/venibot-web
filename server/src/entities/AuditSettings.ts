import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("audit_settings")
export class Guild {
  @Column({
    type: "varchar",
    length: 255,
    name: "webhook_data",
    nullable: true,
  })
  webhook_data!: string;
  @Column({ type: "varchar", length: 255, name: "type", nullable: true })
  type!: string;
  @Column({ type: "simple-json", name: "settings", nullable: true })
  settings!: any;
  @Column({ type: "simple-json", name: "message", nullable: true })
  message!: any;
  @Column({ type: "boolean", name: "is_web_enabled", nullable: true })
  web_enabled!: boolean;
  @Column({ type: "boolean", name: "is_enabled", nullable: true })
  enabled!: boolean;
  @Column({ type: "bigint", name: "guild_id", nullable: true })
  guild_id!: string;
  @PrimaryGeneratedColumn()
  id!: number;
}
