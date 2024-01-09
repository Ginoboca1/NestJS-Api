import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AdminsController } from '../admins.controller';
import { AdminsService } from '../admins.service';
import { AdminsModule } from '../admins.module';
import { User } from '../../users/models/user.schema';
import { Post } from '../../posts/models/post.schema';
import { mock } from '../../users/test/mockUsers';
import { mock as mockPost } from '../../posts/test/mockPost';

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

  describe('getAdminsPosts', () => {
    it('should return all admins posts', async () => {
      jest
        .spyOn(service, 'getAdminsPosts')
        .mockResolvedValue(mockPost.mockData);

      await controller.getAdminsPosts(mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenLastCalledWith(mockPost.mockData);
    });

    it('should return a 404 if not posts founded', async () => {
      jest.spyOn(service, 'getAdminsPosts').mockResolvedValue(null);
      await controller.getAdminsPosts(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'There are no admins posts here',
      });
    });

    it('should propagate an error if usersService.getAdminsPosts() fails', async () => {
      const mockError = new Error('Failed to get users');
      jest.spyOn(service, 'getAdminsPosts').mockRejectedValue(mockError);
      try {
        await controller.getAdminsPosts(mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe('deleteUser', () => {
    const id = mock.mockRequest.user.id;
    it('should be delete an user', async () => {
      jest
        .spyOn(service, 'removeUser')
        .mockResolvedValue({ message: 'User deleted successfully' });

      await controller.deleteUser(id, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User deleted successfully',
      });
    });

    it('should return a 404 if user cant be deleted', async () => {
      jest.spyOn(service, 'removeUser').mockResolvedValue(null);
      await controller.deleteUser(id, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User not found',
      });
    });

    it('should propagate an error if usersService.deleteUser() fails', async () => {
      const mockError = new Error('Failed to get users');
      jest.spyOn(service, 'removeUser').mockRejectedValue(mockError);
      try {
        await controller.deleteUser(id, mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });
});
