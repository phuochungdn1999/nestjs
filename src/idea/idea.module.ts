import { CommentEntity } from './../comment/comment.entity';
import { IdeaResolver } from './idea.resolve';
import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaEntity } from './idea.entity';
import { IdeaService } from './idea.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports:[TypeOrmModule.forFeature([IdeaEntity,UserEntity,CommentEntity])],
  controllers: [IdeaController],
  providers: [IdeaService,IdeaResolver,CommentService]
})
export class IdeaModule {}
