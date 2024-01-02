import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostUpdateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'this is a title', description: 'title' })
  title?: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: 'John Doe', description: 'authors' })
  authors?: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'This a tech content', description: 'content' })
  content?: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: 'tech', description: 'username' })
  categories?: string[];
}
