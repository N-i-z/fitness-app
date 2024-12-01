import { IsNumber, IsDateString } from 'class-validator';

export class CreateWeightDto {
  @IsNumber()
  weight: number;

  @IsDateString()
  date: Date;
}
