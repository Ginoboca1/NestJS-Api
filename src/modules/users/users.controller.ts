import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../../common/enums/role.enum';
import { UserRequest } from 'src/common/interfaces/user-request';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Return a users list' })
  @ApiResponse({ status: 200, description: 'Users list' })
  @ApiResponse({ status: 404, description: 'There are no users here' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllUsers(@Req() req: UserRequest, @Res() res: Response) {
    try {
      const data = await this.usersService.getUsers();
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Return user wich match with the ID provided' })
  @ApiResponse({
    status: 200,
    description: 'Return user wich match with the ID provided',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 404, description: 'User not founded' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.usersService.getUserById(id);
      if (!data) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ data });
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Update an user wich match with the ID provided' })
  @ApiResponse({ status: 200, description: 'Update user' })
  @ApiResponse({
    status: 401,
    description: 'You can only edit your own profile',
  })
  @ApiResponse({
    status: 401,
    description: 'Role and password cannot be changed',
  })
  @ApiResponse({ status: 404, description: 'User not founded' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
    @Req() req: UserRequest,
  ) {
    try {
      const userId = req.user.id;
      const data = await this.usersService.updateUser(id, userId, body, req);
      return res.status(200).json({ data });
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete an user wich match with the ID provided' })
  @ApiResponse({ status: 200, description: 'Delete user' })
  @ApiResponse({
    status: 404,
    description: 'User not founded',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid User ID',
  })
  @ApiResponse({ status: 404, description: 'User not founded' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.usersService.removeUser(id);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }
}
