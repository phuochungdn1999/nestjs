import { IdeaService } from './idea.service';
import { Resolver,Query,Args, Parent, ResolveProperty } from "@nestjs/graphql";
import { CommentService } from 'src/comment/comment.service';

@Resolver()
export class IdeaResolver{
    constructor(private ideaService:IdeaService,private commentService: CommentService){}

    @Query()
  async ideas(@Args('page') page: number, @Args('newest') newest: boolean) {
    return await this.ideaService.showAll(page, newest);
  }

  @ResolveProperty()
  comments(@Parent() idea){
    const {id} = idea;
    return this.commentService.showByIdea(id);
  }
}