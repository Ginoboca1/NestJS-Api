import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Response } from 'express';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from 'src/common/enums/role.enum';
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
  @ApiOperation({ summary: 'Return admin list' })
  @ApiResponse({ status: 200, description: 'Return admin list' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need provide a token',
  })
  @ApiResponse({ status: 404, description: 'There are no admins here' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAdmins(@Res() res: Response) {
    try {
      const data = await this.adminService.getAdmins();
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Return posts by admins list' })
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
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }
}
