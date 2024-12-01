import { IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsBoolean()
  taken: boolean;

  @IsDateString()
  date: Date;
}
