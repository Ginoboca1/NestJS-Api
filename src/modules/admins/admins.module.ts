import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/models/user.schema';
import { Post, PostSchema } from '../posts/models/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
