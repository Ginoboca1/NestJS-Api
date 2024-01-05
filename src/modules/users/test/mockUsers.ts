import { UserRequest } from '../../../common/interfaces/user-request';
import { Role } from '../../../common/enums/role.enum';
import mongoose from 'mongoose';
import { Response } from 'express';

export const mock = {
  mockRequest: {
    user: { id: '123id' },
  } as unknown as UserRequest,

  mockData: [
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
  ],

  mockUser: {
    _id: new mongoose.Types.ObjectId(),
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'hashedPassword123',
    role: Role.USER,
  },
  mockUserDto: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'hashedPassword123',
    role: Role.USER,
  },

  createMockResponse(): Response {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    return res as Response;
  },
};
