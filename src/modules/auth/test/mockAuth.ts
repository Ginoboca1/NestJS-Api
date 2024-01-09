import { Role } from '../../../common/enums/role.enum';
export const mockAuth = {
  mockMessage: { message: 'SignUp successfully' },
  mockErrorMessage: { message: 'Signup failed' },
  mockSignUp: {
    name: 'Name',
    email: 'Email',
    password: 'Password',
    role: Role.ADMIN,
  },
};
