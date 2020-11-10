import { UserEntity } from './../user/user.entity';
import { IdeaEntity } from 'src/idea/idea.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentEntity } from './comment.entity';
import {CommentService} from './comment.service'
import { IdeaResolver } from 'src/idea/idea.resolve';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, IdeaEntity, UserEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
