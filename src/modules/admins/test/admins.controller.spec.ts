import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AdminsController } from '../admins.controller';
import { AdminsService } from '../admins.service';
import { AdminsModule } from '../admins.module';
import { User } from '../../users/models/user.schema';
import { Post } from '../../posts/models/post.schema';
import { mock } from '../../users/test/mockUsers';

describe('AdminsController', () => {
  let controller: AdminsController;
  let service: AdminsService;
  const mockResponse = mock.createMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminsModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .overrideProvider(getModelToken(Post.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<AdminsController>(AdminsController);
    service = module.get<AdminsService>(AdminsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      jest.spyOn(service, 'getUsers').mockResolvedValue(mock.mockData);
      await controller.getUsers(mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mock.mockData);
    });
    it('should return a 404 error if not found users', async () => {
      jest.spyOn(service, 'getUsers').mockResolvedValue(null);
      await controller.getUsers(mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
    it('should propagate an error if usersService.getUsers() fails', async () => {
      const mockError = new Error('Failed to get users');
      jest.spyOn(service, 'getUsers').mockRejectedValue(mockError);
      try {
        await controller.getUsers(mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });
});
