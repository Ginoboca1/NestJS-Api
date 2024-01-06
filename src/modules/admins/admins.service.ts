import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/models/user.schema';
import { Post } from '../posts/models/post.schema';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().select('-password').lean();
    if (!users || users.length === 0) {
      throw new NotFoundException('There are no admins here');
    }
    return users;
  }

  async getAdminsPosts(): Promise<Post[]> {
    const postsByAdmins = await this.postModel.find().lean();
    if (!postsByAdmins) {
      throw new NotFoundException('There are no admins posts here');
    }
    return postsByAdmins;
  }
}
