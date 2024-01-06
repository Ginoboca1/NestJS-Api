import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockAuth } from '../test/mockAuth';
import { mock } from '../../users/test/mockUsers';
import { User } from '../../users/models/user.schema';
import { AuthModule } from '../auth.module';
import { JwtStrategy } from '../strategies/jwt.strategy';
jest.mock('mongoose');

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  const mockResponse = mock.createMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(JwtStrategy)
      .useValue({
        // Mock implementation of JwtStrategy
        isValid: () => true,
        authenticate: () => Promise.resolve({ userId: 1 }), // Adjust as needed
      })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('SignUp', () => {
    it('should create a user successfully', async () => {
      jest.spyOn(service, 'SignUp').mockResolvedValue(mockAuth.mockMessage);
      await controller.Signup(mockAuth.mockSignUp, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuth.mockMessage);
    });

    it('should handle unexpected errors during signup', async () => {
      jest.spyOn(service, 'SignUp').mockResolvedValue(null);
      await controller.Signup(mockAuth.mockSignUp, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuth.mockErrorMessage);
    });
  });
});
