import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private readonly repo: Repository<Post>){

  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
  const post = await this.repo.findOne({ where: { id } });
  if (!post) {
    throw new BadRequestException('Post not found')
  }
  return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.repo.update(id, updatePostDto);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
