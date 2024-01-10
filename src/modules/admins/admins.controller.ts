import { Controller, Delete, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Response } from 'express';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/users')
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, description: 'Return admin list' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need provide a token',
  })
  @ApiResponse({ status: 404, description: 'There are no admins here' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getUsers(@Res() res: Response) {
    try {
      const data = await this.adminService.getAdmins();
      if (!data) {
        return res.status(404).json(data);
      }
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all admins posts' })
  @ApiResponse({ status: 200, description: 'Return posts by admins' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need provide a token',
  })
  @ApiResponse({ status: 404, description: 'There are no admins posts here' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('/posts')
  async getAdminsPosts(@Res() res: Response) {
    try {
      const data = await this.adminService.getAdminsPosts();
      if (!data) {
        return res
          .status(404)
          .json({ message: 'There are no admins posts here' });
      }
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not founded' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.adminService.removeUser(id);
      if (!data) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }
}
