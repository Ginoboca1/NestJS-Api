import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsModule } from '../posts.module';
import { PostsService } from '../posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from '../models/post.schema';
import { User } from '../../users/models/user.schema';
import { UsersModule } from '../../users/users.module';
import { mock } from './mockPost';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;
  const mockResponse = mock.createMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostsModule, UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .overrideProvider(getModelToken(Post.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPosts', () => {
    it('return all posts', async () => {
      jest.spyOn(service, 'getPosts').mockResolvedValue(mock.mockData);

      await controller.getPosts(1, 10, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mock.mockData);
    });

    it('should return a 404 error if not found posts', async () => {
      jest.spyOn(service, 'getPosts').mockResolvedValue(null);
      await controller.getPosts(1, 10, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should propagate an error if usersService.getPost() fails', async () => {
      const mockError = new Error('Failed to get posts');
      jest.spyOn(service, 'getPosts').mockRejectedValue(mockError);
      try {
        await controller.getPosts(1, 10, mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });
});
