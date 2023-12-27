import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/models/user.schema';
import { Post } from '../posts/models/post.schema';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async getAdmins(): Promise<User[]> {
    const users = await this.userModel.find().select('-password').lean();
    if (!users || users.length === 0) {
      throw new NotFoundException('There are no admins here');
    }
    return users;
  }

  async getAdminsPosts(): Promise<Post[]> {
    const admins = await this.postModel.find().lean();
    return admins;
  }
}
