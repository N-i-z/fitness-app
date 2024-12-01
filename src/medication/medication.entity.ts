import { Entity, Column, PrimaryGeneratedColumn } from 'prisma';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  taken: boolean;

  @Column()
  date: Date;

  @Column()
  tenantId: string;
}
