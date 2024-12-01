import { Entity, Column, PrimaryGeneratedColumn } from 'prisma';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  date: Date;
}
