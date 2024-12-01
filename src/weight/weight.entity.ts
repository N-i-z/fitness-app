import { Entity, Column, PrimaryGeneratedColumn } from 'prisma';

@Entity()
export class Weight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  weight: number;

  @Column()
  date: Date;

  @Column()
  tenantId: string;
}
