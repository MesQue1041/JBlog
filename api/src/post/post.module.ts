import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      database: "JBlog",
      username: "root",
      password: "Abdul@1041",
      autoLoadEntities: true,
      port: 3306,
      synchronize: true
    })
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
