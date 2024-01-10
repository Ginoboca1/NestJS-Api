import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'this is a title', description: 'title' })
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: 'John Doe', description: 'authors' })
  authors?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'This a tech content', description: 'content' })
  content?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: 'tech', description: 'username' })
  categories?: string[];
}
