import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './models/post.schema';
import { UserRequest } from 'src/common/interfaces/user-request';
import { PostUpdateDto } from './dto/post-update';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  async createPost({ body, userId, userName }) {
    const { title, content, categories } = body;
    if (categories.length === 0) {
      throw new BadRequestException('Post should be at least one categorie');
    }
    const postCreated = await this.postModel.create({
      title,
      author: userName,
      content,
      categories,
      userId,
    });
    if (!postCreated) {
      throw new NotFoundException();
    }
    return { message: 'Post created successfully', id: postCreated._id };
  }

  async getPosts(page = 1, limit = 10): Promise<Post[]> {
    const skip = (page - 1) * limit;
    const posts = await this.postModel.find().skip(skip).limit(limit).lean();
    if (!posts || posts.length === 0) {
      throw new NotFoundException('No posts here');
    }
    return posts;
  }

  async getPostById(id: string) {
    const post = await this.postModel.findById(id).lean();
    if (!post) {
      throw new NotFoundException('Post not founded');
    }
    return post;
  }

  async updatePost(req: UserRequest, idParam: string, body: PostUpdateDto) {
    const { id, role } = req.user;
    const postToUpdate = await this.getPostById(idParam);

    if (!postToUpdate) {
      throw new NotFoundException('Post not found');
    }
    if (!(postToUpdate.userId.toString() === id || role === 'admin')) {
      throw new BadRequestException('You can only update your own post');
    }
    const updatedPost = await this.postModel
      .findByIdAndUpdate(idParam, body)
      .lean();

    return { message: 'Post updated successfully', id: updatedPost._id };
  }

  async deletePost(req, idParam: string): Promise<object> {
    const { id, role } = req.user;
    const postToDelete = await this.getPostById(idParam);
    if (!(postToDelete.userId.toString() === id || role === 'admin')) {
      throw new BadRequestException('You can only delete your own post');
    }
    const postDeleted = await this.postModel.findByIdAndDelete(idParam);
    if (!postDeleted) {
      throw new NotFoundException('Post not founded');
    }
    return { message: 'Post deleted successfully' };
  }

  async getPostByUser(userId: string) {
    const posts = await this.postModel
      .find({ userId })
      .populate({
        path: 'userId',
        select: '_id',
      })
      .lean();
    if (!posts || posts.length === 0) {
      throw new NotFoundException(`This user doesn't have any posts.`);
    }
    return posts;
  }

  async searchPosts(query: string, page: string, limit: string) {
    if (!query || query === '') {
      throw new NotFoundException('Provide a title');
    }
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const results = await this.postModel
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
        ],
      })
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .lean();
    if (!results) {
      throw new NotFoundException('Posts not founded');
    }
    return results;
  }

  async filterByCategory(category: string, author: string) {
    let query = {};
    const categoryParam = category.toLowerCase();
    if (categoryParam && author) {
      query = { categories: categoryParam, author };
    } else if (categoryParam) {
      query = { categories: categoryParam };
    } else if (author) {
      query = { author };
    } else {
      throw new BadRequestException(
        'To filter, please provide an author or category',
      );
    }
    const posts = await this.postModel.find(query);
    if (!posts || posts.length === 0) {
      throw new NotFoundException('Posts not found');
    }
    return posts;
  }
}
