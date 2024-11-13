import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PostModule, TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      database: "JBlog",
      username: "root",
      password: "Abdul@1041",
      autoLoadEntities: true,
      port: 3306,
      synchronize: false
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
