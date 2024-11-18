import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostModule, CategoryModule, TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      database: "postgres",
      username: "postgres",
      password: "12345",
      autoLoadEntities: true,
      port: 5432,
      synchronize: true,
    }),  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
