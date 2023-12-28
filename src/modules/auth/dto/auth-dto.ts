import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Example1234.', description: 'password' })
  password: string;
}

export class SignUp extends Login {
  @IsOptional()
  @ApiProperty({ example: 'John Doe', description: 'username' })
  name?: string;

  @IsEmail()
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  email: string;

  @IsNotEmpty()
  @Matches(/[\W]/, {
    message: 'La contraseña debe contener al menos un carácter especial.',
  })
  @ApiProperty({ example: 'Example1234.', description: 'password' })
  password: string;
  @ApiProperty({ example: 'user, admin', description: 'role' })
  role: Role;
}
