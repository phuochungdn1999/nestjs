import { CommentDTO } from './comment.dto';
import { Args, Context, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { UseGuards } from '@nestjs/common';
@Resolver()
export class CommentResolver{
    constructor(private commentService :CommentService){}

    @Query()
    comment(@Args('id')id:string){
        return this.commentService.show(id);
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    createComment(@Args('idea')ideaId:string,@Args('comment')comment:string,
    @Context('user')user){
        const data:CommentDTO = {comment};
        const {id:userId} = user
        return this.commentService.create(ideaId,userId,data);
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    deleteComment(@Args('id')id:string,@Context('user') user){
        const {id:userId} = user;
        return this.commentService.destroy(id,userId)
    }
}