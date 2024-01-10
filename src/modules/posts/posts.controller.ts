import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Response } from 'express';
import { PostDto } from './dto/post';
import { UserRequest } from 'src/common/interfaces/user-request';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PostUpdateDto } from './dto/post-update';

@ApiBearerAuth()
@ApiTags('posts')
@Roles(Role.ADMIN, Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Return a successfully message and create a post',
  })
  @ApiResponse({
    status: 400,
    description: 'Post should be at least one categorie',
  })
  @ApiResponse({
    status: 400,
    description: 'Post not founded',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createPost(
    @Req() req: UserRequest,
    @Body() body: PostDto,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const userName = req.user.name;
      const data = await this.postsService.createPost({
        body,
        userId,
        userName,
      });
      if (!data) {
        return res.status(404).json({ message: 'Error while create a post' });
      }
      return res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'List all posts, supporting pagination with parameters',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a posts list',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts here',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not founded',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getPosts(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.getPosts(page, limit);
      if (!data) {
        return res.status(404).json({ message: 'No posts here' });
      }
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/search')
  @ApiOperation({
    summary: 'Search for posts by title, content, author',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the posts that match the search parameters',
  })
  @ApiResponse({ status: 404, description: 'Provide a title' })
  @ApiResponse({ status: 404, description: 'Not posts founded' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async searchPost(
    @Query('query') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.searchPosts(query, page, limit);
      if (!data) {
        return res.status(404).json({ message: 'No posts found' });
      }
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/filter')
  @ApiOperation({ summary: 'Filter posts by category or author' })
  @ApiResponse({
    status: 200,
    description: 'Filter posts by author or category',
  })
  @ApiResponse({
    status: 400,
    description: 'To filter, please provide an author or category',
  })
  @ApiResponse({
    status: 404,
    description: 'Posts not founded',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized,you need provided a token',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async filterByCategory(
    @Query('category') category: string,
    @Query('author') author: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.filterByCategory(category, author);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View details of a specific post' })
  @ApiResponse({
    status: 200,
    description: 'Returns a post wich match with the ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not founded',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getPostById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostById(id);
      if (!data) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json({ data });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    description: 'Update post wich match with the ID provided',
  })
  @ApiResponse({
    status: 400,
    description: 'You can only update your own post',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updatePost(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() body: PostUpdateDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.updatePost(req, id, body);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({
          message: 'Post not founded',
          error: 'Not Found',
          statusCode: 404,
        });
      } else {
        throw error;
      }
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'Delete post wich match with the ID provided',
  })
  @ApiResponse({
    status: 400,
    description: 'You can only delete your own post',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async deletePost(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: UserRequest,
  ) {
    try {
      const data = await this.postsService.deletePost(req, id);
      if (!data) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: ' View all posts by a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Returns posts from a specific user',
  })
  @ApiResponse({
    status: 404,
    description: "This user doesn't have any posts.",
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getPostByUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostByUser(userId);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }
}
