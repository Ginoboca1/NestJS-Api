import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().select('-password').lean();
    if (!users || users.length === 0) {
      throw new NotFoundException('There are no users here');
    }
    return users;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).select('-password').lean();
    if (!user) {
      throw new NotFoundException('User not founded');
    }
    return user;
  }

  async updateUser(paramId: string, tokenId: string, body: UpdateUserDto, req) {
    const { role } = req.user;
    if (!(tokenId === paramId || role === 'admin')) {
      throw new UnauthorizedException('You can only edit your own profile');
    }
    if (body.role || body.password) {
      throw new UnauthorizedException('Role and password cannot be changed');
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(paramId, body)
      .lean();
    if (!updatedUser) {
      throw new NotFoundException('User not founded');
    }
    return {
      message: 'User updated successfully',
    };
  }

  async removeUser(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestException('Invalid user ID');
      }
      const userDeleted = await this.userModel.findByIdAndDelete(id);
      if (!userDeleted) {
        throw new NotFoundException('User not founded');
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
