import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'this is a title', description: 'title' })
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'This a tech content', description: 'content' })
  content: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: ['tech'], description: 'username' })
  categories: string[];
}
