import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsModule } from '../posts.module';
import { PostsService } from '../posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from '../models/post.schema';
import { User } from '../../users/models/user.schema';
import { UsersModule } from '../../users/users.module';
import { mock } from './mockPost';
import { NotFoundException } from '@nestjs/common';

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

  describe('createPost', () => {
    it('create a post', async () => {
      jest
        .spyOn(service, 'createPost')
        .mockResolvedValue(mock.messageSuccessfully);

      await controller.createPost(
        mock.mockRequest,
        mock.mockPost,
        mockResponse,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mock.messageSuccessfully);
    });

    it('should return a 404 error if error ocurring while create a posts', async () => {
      jest.spyOn(service, 'createPost').mockResolvedValue(null);
      await controller.createPost(
        mock.mockRequest,
        mock.mockPost,
        mockResponse,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error while create a post',
      });
    });

    it('should propagate an error if usersService.getPost() fails', async () => {
      const mockError = new Error('Failed to get posts');
      jest.spyOn(service, 'createPost').mockRejectedValue(mockError);
      try {
        await controller.createPost(
          mock.mockRequest,
          mock.mockPost,
          mockResponse,
        );
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
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
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'No posts here',
      });
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

  describe('searchPost', () => {
    it('return posts based in provided query', async () => {
      jest.spyOn(service, 'searchPosts').mockResolvedValue(mock.mockData);
      await controller.searchPost('review', '1', '10', mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mock.mockData);
    });

    it('should return a 404 error if not found posts', async () => {
      jest.spyOn(service, 'searchPosts').mockResolvedValue(null);
      await controller.searchPost('review', '1', '10', mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'No posts found',
      });
    });

    it('should propagate an error if usersService.getPost() fails', async () => {
      const mockError = new Error('Failed to get posts');
      jest.spyOn(service, 'searchPosts').mockRejectedValue(mockError);
      try {
        await controller.searchPost('review', '1', '10', mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe('getPostById', () => {
    it('get a post wich match with the id', async () => {
      jest.spyOn(service, 'getPostById').mockResolvedValue(mock.mockPost);
      await controller.getPostById('id', mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mock.mockData);
    });

    it('should return a 404 error if not found posts', async () => {
      jest.spyOn(service, 'getPostById').mockResolvedValue(null);
      await controller.getPostById('id', mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Post not found',
      });
    });

    it('should propagate an error if usersService.getPost() fails', async () => {
      const mockError = new Error('Failed to get posts');
      jest.spyOn(service, 'getPostById').mockRejectedValue(mockError);
      try {
        await controller.getPostById('id', mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe('updatePost', () => {
    const id = mock.mockRequest.user.id;
    it('should be update a post', async () => {
      jest
        .spyOn(service, 'updatePost')
        .mockResolvedValue(mock.messageSuccessfully);
      await controller.updatePost(
        id,
        mock.mockRequest,
        mock.mockPost,
        mockResponse,
      );
      expect(mockResponse.status(200));
      expect(mockResponse.json).toHaveBeenCalledWith(mock.messageSuccessfully);
    });

    it('should return a 404 error if not found posts', async () => {
      jest.spyOn(service, 'updatePost').mockImplementation(async () => {
        throw new NotFoundException('Post not found');
      });

      await controller.updatePost(
        'id',
        mock.mockRequest,
        mock.mockPost,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Post not founded',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    it('should propagate an error if usersService.updatePost() fails', async () => {
      const mockError = new Error('Failed to get posts');
      jest.spyOn(service, 'updatePost').mockRejectedValue(mockError);
      try {
        await controller.updatePost(
          'id',
          mock.mockRequest,
          mock.mockPost,
          mockResponse,
        );
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
        expect(mockResponse.status(404));
      }
    });
  });

  describe('deletePost', () => {
    it('should be update a post', async () => {
      jest
        .spyOn(service, 'deletePost')
        .mockResolvedValue(mock.messageSuccessfully);
      await controller.deletePost('id', mockResponse, mock.mockRequest);
      expect(mockResponse.status(201));
      expect(mockResponse.json).toHaveBeenCalledWith(mock.messageSuccessfully);
    });

    it('should return a 404 error if not found posts', async () => {
      jest.spyOn(service, 'deletePost').mockResolvedValue(null);
      await controller.deletePost('id', mockResponse, mock.mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Post not found',
      });
    });

    it('should propagate an error if usersService.getPost() fails', async () => {
      const mockError = new Error('Failed to get posts');
      jest.spyOn(service, 'deletePost').mockRejectedValue(mockError);
      try {
        await controller.deletePost('id', mockResponse, mock.mockRequest);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });
});
