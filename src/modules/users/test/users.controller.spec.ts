import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersModule } from '../users.module';
import { User } from '../models/user.schema';
import { mock } from './mockUsers';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const mockResponse = mock.createMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      jest.spyOn(service, 'getUsers').mockResolvedValue(mock.mockData);

      await controller.getAllUsers(mock.mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mock.mockData);
    });
    it('should return a 404 error if not found an user', async () => {
      jest.spyOn(service, 'getUsers').mockResolvedValue(null);
      await controller.getAllUsers(mock.mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
    it('should propagate an error if usersService.getUsers() fails', async () => {
      const mockError = new Error('Failed to get users');
      jest.spyOn(service, 'getUsers').mockRejectedValue(mockError);
      try {
        await controller.getAllUsers(mock.mockRequest, mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe('getUserById', () => {
    const id = JSON.stringify(mock.mockUser._id);

    it('Should return an user', async () => {
      jest.spyOn(service, 'getUserById').mockResolvedValue(mock.mockUser);

      await controller.getUserById(id, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mock.mockUser });
    });

    it('should return a 404 error if not found an user', async () => {
      jest.spyOn(service, 'getUserById').mockResolvedValue(null);
      await controller.getUserById(id, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should propagate an error if usersService.getUsers() fails', async () => {
      const mockError = new Error('Failed to get users');
      jest.spyOn(service, 'getUserById').mockRejectedValue(mockError);
      try {
        await controller.getUserById(id, mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe('updateUser', () => {
    const id = mock.mockRequest.user.id;
    it('Should return an updated user', async () => {
      jest
        .spyOn(service, 'updateUser')
        .mockResolvedValue({ message: 'update successfully' });

      await controller.updateUser(
        id,
        mock.mockUserDto,
        mockResponse,
        mock.mockRequest,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'update successfully',
      });
    });
    it('should return a 404 error if not found an user', async () => {
      jest.spyOn(service, 'updateUser').mockResolvedValue(null);
      await controller.updateUser(
        id,
        mock.mockUserDto,
        mockResponse,
        mock.mockRequest,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteUser', () => {
    const id = mock.mockRequest.user.id;
    it('should delete an user', async () => {
      jest
        .spyOn(service, 'removeUser')
        .mockResolvedValue({ message: 'User deleted successfully' });
      await controller.deleteUser(id, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User deleted successfully',
      });
    });

    it('should return a 404 error if not found an user', async () => {
      jest.spyOn(service, 'removeUser').mockResolvedValue(null);
      await controller.deleteUser(id, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });
});
