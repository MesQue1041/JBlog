import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseInterceptors, ClassSerializerInterceptor, ValidationPipe, Req, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
      // @ts-ignore: Suppress 'user' does not exist error temporarily
      return this.postService.create(createPostDto, req.user as User);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() query: any) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get("/slug/:slug")
  findBySlug(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Patch(":slug")
  update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(slug, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
