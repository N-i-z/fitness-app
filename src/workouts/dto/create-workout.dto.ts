import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  type: string;

  @IsNumber()
  duration: number;

  @IsDateString()
  date: Date;
}
