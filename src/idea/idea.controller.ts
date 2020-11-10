import { User } from './../user/user.decorator';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { IdeaDTO } from './idea.dto';

import { IdeaService } from './idea.service';

@Controller('/api/ideas')
export class IdeaController {
    private logger = new Logger('IdeaController');

    constructor(private ideaService: IdeaService){}

    private logData(options:any){
        options.user && this.logger.log('USER'+JSON.stringify(options.user.id));
        options.data && this.logger.log('DATA'+JSON.stringify(options.data));
        options.id&&this.logger.log('IDEA'+JSON.stringify(options.id));
    }

    @Get() 
    showAllIdeas(@Query('page')page:number) {
        return this.ideaService.showAll(page);
    }

    @Get('/newest')
    showNewestIdeas(@Query('page') page: number) {
      return this.ideaService.showAll(page, true);
    }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createIdea(@User() user, @Body() body: IdeaDTO) {
        this.logData({ user, body });
        return this.ideaService.create(user.id, body);
    }

    @Get(':id')
    async readIdea(@Param('id')id:string) {
        const data = await this.ideaService.read(id);
        return data;
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe)
    updateIdea(@Param('id')id:string,@User('id')user ,@Body() data:Partial<IdeaDTO>) {
        this.logData({id,user,data});
        return this.ideaService.update(id,user.id,data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyIdea(@Param('id')id:string,@User('id')user){
        this.logData({id,user})
        return this.ideaService.destroy(id,user.id);
    }

    @Post(':id/bookmark')
    @UseGuards(new AuthGuard())
    bookmarkIdea(@Param('id') id: string, @User() user) {
      this.logData({ id, user });
      return this.ideaService.bookmark(id, user.id);
    }
  
    @Delete(':id/bookmark')
    @UseGuards(new AuthGuard())
    unbookmarkIdea(@Param('id') id: string, @User() user) {
      this.logData({ id, user });
      return this.ideaService.unbookmark(id, user.id);
    }

    @Post(':id/upvote')
  @UseGuards(new AuthGuard())
  upvoteIdea(@Param('id') id: string, @User('id') user: any) {
    console.log("Test"+user.id);
    this.logData({ id, user });
    return this.ideaService.upvote(id, user.id);
  }

  @Post(':id/downvote')
  @UseGuards(new AuthGuard())
  downvoteIdea(@Param('id') id: string, @User('id') user: any) {
    this.logData({ id, user });
    return this.ideaService.downvote(id, user.id);
  }

    
}
