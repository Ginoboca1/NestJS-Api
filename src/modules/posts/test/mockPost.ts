import { Role } from '../../../common/enums/role.enum';
import { Response } from 'express';

export const mock = {
  mockData: [
    {
      _id: '656105f29e485e9a8a26eb4f',
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
      _id: '65733a2bdc594cdeb3ce142b',
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
      _id: '657383743602c3babd949c91',
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

  createMockResponse(): Response {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    return res as Response;
  },
};
