import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateMealDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  weight: number;
}
