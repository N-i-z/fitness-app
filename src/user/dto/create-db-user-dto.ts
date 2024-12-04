import { IsEmail } from 'class-validator';

export class CreateDBUserDto {
  name: string;

  @IsEmail()
  email: string[];
}
