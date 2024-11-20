import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseInterceptors, ClassSerializerInterceptor, ValidationPipe, Req, Query, UseGuards, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/user.decorator';
import { CurrentUserGuard } from 'src/auth/current-user.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request, @CurrentUser() user: User) {
      // @ts-ignore: Suppress 'user' does not exist error temporarily
      console.log(user);
      return this.postService.create(createPostDto, req.user as User);
  }

  @Get()
  @UseGuards(CurrentUserGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() query: any, @Req() req: Request, @CurrentUser() user: User) {
    console.log(user);
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

  @Post('upload-photo')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0]; // Get the name before the first dot
      const fileExtension = file.originalname.split('.').pop(); // Get the extension after the last dot
      const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension; // Construct the filename

      cb(null, newFileName); // Pass the new filename to the callback
    }
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { // Allow only specific image formats
      return cb(new BadRequestException('Only image files are allowed!'), false);
    }
    cb(null, true); // Accept the file
  }
}))
uploadPhoto(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    throw new BadRequestException('File is not an image');
  } else {
    const response = {
      filepath: `http://localhost:5000/post/pictures/${file.filename}` // Construct the response
    };
    return response;
  }
}

  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename, @Res() res: Response){
    res.sendFile(filename, {root: './uploads'});
  }


  @Patch(":slug")
  @UseGuards(AuthGuard('jwt'))
  update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(slug, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
