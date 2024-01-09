import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/models/user.schema';
import { Model } from 'mongoose';
import { SignUp } from './dto/auth-dto';
import { comparePassword, hashPassword } from '../../utils/bcrypt-passwords';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/common/interfaces/payload-user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userFounded = await this.userModel.findOne({ email });
    if (!userFounded) {
      throw new NotFoundException('User not founded');
    }
    const isMatch = await comparePassword(password, userFounded.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email or Password incorrects');
    }
    return userFounded;
  }

  async SignUp(body: SignUp) {
    const { email, password, name, role } = body;
    const hashedPassword = await hashPassword(password);
    const userFound = await this.userModel.findOne({ email });
    if (userFound) {
      throw new UnauthorizedException('Email already exist');
    }
    await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return { message: 'User created successfully' };
  }

  async Login(user: UserPayload) {
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    const token = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return { message: `Logged successfully, ${user.name}`, token };
  }
}
