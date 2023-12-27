import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class Login {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUp extends Login {
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/[\W]/, {
    message: 'La contraseña debe contener al menos un carácter especial.',
  })
  password: string;
  role: Role;
}
