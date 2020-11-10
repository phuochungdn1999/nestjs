import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { IdeaEntity } from 'src/idea/idea.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,IdeaEntity,CommentEntity])],
  controllers: [UserController],
  providers: [UserService,UserResolver,CommentService]
})
export class UserModule {}
