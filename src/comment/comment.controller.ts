import { ValidationPipe } from './../shared/validation.pipe';
import { AuthGuard } from './../shared/auth.gaurd';
import { Controller, Get, Post, Param, UseGuards, UsePipes, Delete, Query } from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('api/comments')
export class CommentController {
    constructor(private commentService:CommentService){}

    @Get('idea/:id') 
    showCommentsById(@Param('id') id: string,@Query('page')page:number) {
        return this.commentService.show(id);
    }
    @Get('user/:id') 
    showCommentsByUser(@Param('id') user: string,@Query('page')page:number) {
        return this.commentService.showByUser(user)
    }
    @Post('idea/:id') @UseGuards(new AuthGuard()) @UsePipes(new ValidationPipe()) 
    createComment(@Param('id') idea: string, @User('id') user, @Body() data: CommentDTO,) {
        return this.commentService.create(idea,user.id,data);
    }

    

    @Get(':id') 
    showComment(@Param('id') id: string) {
        return this.commentService.show(id);
    }

    @Delete(':id') @UseGuards(new AuthGuard()) 
    destroyComment(@Param('id') id: string, @User('id') user) {
        return this.commentService.destroy(id, user.id);
    }
}
