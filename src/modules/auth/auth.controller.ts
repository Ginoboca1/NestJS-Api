import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUp } from './dto/auth-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRequest } from 'src/common/interfaces/user-request';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create an user' })
  @ApiResponse({
    status: 201,
    description: 'Return a successfully message and Create an user',
  })
  @ApiResponse({ status: 401, description: 'Email already exists' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async Signup(@Body() body: SignUp, @Res() res: Response) {
    try {
      await this.authService.SignUp(body);
      res.status(200).json({ message: 'SignUp successfully' });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Assign token to a user' })
  @ApiResponse({
    status: 200,
    description: 'Return a successfully message and user token',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async Login(@Req() req: UserRequest, @Res() res: Response) {
    try {
      const result = await this.authService.Login(req.user);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }
}
