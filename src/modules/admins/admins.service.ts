import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from '../users/models/user.schema';
import { Post } from '../posts/models/post.schema';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async getAdmins(): Promise<User[]> {
    const admins = await this.userModel
      .find({ role: 'admin' })
      .select('-password')
      .lean();
    if (!admins || admins.length === 0) {
      throw new NotFoundException('There are no admins here');
    }
    return admins;
  }

  async getAdminsPosts(): Promise<Post[]> {
    const postsByAdmins = await this.postModel
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $match: {
            'user.role': Role.ADMIN,
          },
        },
      ])
      .exec();

    if (!postsByAdmins || postsByAdmins.length === 0) {
      throw new NotFoundException('There are not posts by admins.');
    }
    return postsByAdmins.map((result) => ({
      _id: result._id,
      title: result.title,
      author: result.author,
      content: result.content,
      categories: result.categories,
      userId: result.userId,
    }));
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
