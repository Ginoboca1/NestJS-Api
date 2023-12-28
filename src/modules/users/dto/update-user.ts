import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'username' })
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  readonly email?: string;

  @IsOptional()
  @ApiProperty({ example: 'user, admin', description: 'role' })
  readonly role?: Role;

  @IsOptional()
  @ApiProperty({ example: 'Example', description: 'password' })
  readonly password?: string;
}
