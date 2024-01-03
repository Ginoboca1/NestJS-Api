import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { Response } from 'express';
import { UserRequest } from '../../common/interfaces/user-request';
import { Role } from '../../common/enums/role.enum';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockRequest = {} as unknown as UserRequest;
  const mockResponse = {} as unknown as Response;

  beforeEach(async () => {
    const mockUsersService = { getUsers: jest.fn() };

    //Create a testing module with UsersController within it
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
      imports: [UsersModule],
    }).compile();

    //return a UsersController intance
    //Recupera una instancia de UsersController del módulo de prueba, lista para la prueba.
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  //Testing the controller existence
  //Esta prueba verifica si la variable del controlador realmente contiene una instancia definida de la clase UsersController, asegurando que la configuración básica sea correcta.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Testing the getAllUsers function
  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      const mockData = [
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'hashedPassword123', // Replace with a hashed password
          role: Role.USER,
        },
        {
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          password: 'hashedPassword456', // Replace with a hashed password
          role: Role.ADMIN,
        },
      ];
      jest.spyOn(service, 'getUsers').mockResolvedValue(mockData);
      controller.getAllUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);

      //testing error cases
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
  });
});
