import { Entity, Column, PrimaryGeneratedColumn } from 'prisma';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  duration: number;

  @Column()
  date: Date;

  @Column()
  tenantId: string;
}
