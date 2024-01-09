import { Role } from '../../../common/enums/role.enum';
import { Response } from 'express';
import { Types } from 'mongoose';
import { UserRequest } from '../../../common/interfaces/user-request';

export const mock = {
  mockPost: {
    _id: new Types.ObjectId('656105f29e485e9a8a26eb4f'),
    title: 'iPhone 15 review',
    author: 'Manolo',
    content: 'This is a content',
    categories: ['tech'],
    userId: {
      _id: '655e078a81276db475f5e558',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedPassword',
      role: Role.ADMIN,
    },
    __v: 0,
  },

  mockData: [
    {
      _id: new Types.ObjectId('656105f29e485e9a8a26eb4f'),
      title: 'iPhone 15 review',
      author: 'Manolo',
      content: 'This is a content',
      categories: ['tech'],
      userId: {
        _id: '655e078a81276db475f5e558',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'hashedPassword',
        role: Role.ADMIN,
      },
      __v: 0,
    },
    {
      _id: new Types.ObjectId('656105f29e485e9a8a26eb4f'),
      title: 'Westworld review',
      author: 'Stephen',
      content: 'This is a content',
      categories: ['tv'],
      userId: {
        _id: '655e078a81276db475f5e558',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'hashedPassword',
        role: Role.MODERATOR,
      },
      __v: 0,
    },
    {
      _id: new Types.ObjectId('656105f29e485e9a8a26eb4f'),
      title: 'Macbook M2 review',
      author: 'Stephen',
      content: 'This is a content',
      categories: ['tech'],
      userId: {
        _id: '655e078a81276db475f5e558',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'hashedPassword',
        role: Role.ADMIN,
      },
      __v: 0,
    },
  ],
  mockRequest: {
    user: { id: '123id' },
  } as unknown as UserRequest,

  messageSuccessfully: {
    message: 'Post updated successfully',
    id: new Types.ObjectId('656105f29e485e9a8a26eb4f'),
  },

  createMockResponse(): Response {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    return res as Response;
  },
};
