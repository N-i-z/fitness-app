import { Entity, Column, PrimaryGeneratedColumn } from 'prisma';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  tenantId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  weight: number;

  @Column()
  fat_total_g: number;

  @Column()
  fat_saturated_g: number;

  @Column()
  sodium_mg: number;

  @Column()
  potassium_mg: number;

  @Column()
  cholesterol_mg: number;

  @Column()
  carbohydrates_total_g: number;

  @Column()
  fiber_g: number;

  @Column()
  sugar_g: number;
}
