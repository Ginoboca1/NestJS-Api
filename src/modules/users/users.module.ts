import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { AuthService } from '../auth/auth.service';
import { ValidateToken } from '../auth/jwt/jwt.validate';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, AuthService, ValidateToken],
})
export class UsersModule {}
