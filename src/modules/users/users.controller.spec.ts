import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { User } from './models/user.schema';
import { UserRequest } from '../../common/interfaces/user-request';
import { Role } from '../../common/enums/role.enum';
import { Response } from 'express';
import mongoose from 'mongoose';

function createMockResponse(): Response {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return res as Response;
}

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockRequest = {} as unknown as UserRequest;

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

  const mockResponse = createMockResponse();

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      const mockData = [
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'hashedPassword123',
          role: Role.USER,
        },
        {
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          password: 'hashedPassword456',
          role: Role.ADMIN,
        },
      ];
      jest.spyOn(service, 'getUsers').mockResolvedValue(mockData);

      await controller.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
    it('should propagate an error if usersService.getUsers() fails', async () => {
      const mockError = new Error('Failed to get users');
      jest.spyOn(service, 'getUsers').mockRejectedValue(mockError);
      try {
        await controller.getAllUsers(mockRequest, mockResponse);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe('getUserById', () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedPassword123',
      role: Role.USER,
    };
    const id = JSON.stringify(mockUser._id);

    it('Should return an user', async () => {
      jest.spyOn(service, 'getUserById').mockResolvedValue(mockUser);

      await controller.getUserById(id, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUser });
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
});
