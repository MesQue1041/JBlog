import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const {token, user} = await this.authService.login(userLoginDto);

    res.cookie('IsAuthenicated', true,  {maxAge: 2*690*60*1000})  //max age 2 hours
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2*690*60*1000
    });

    return res.send({ sucess: true, user});
  }

  @Post('register')
  async userRegistration(@Body() userCreateDto: CreateUserDto) {
    return this.authService.register(userCreateDto);
  }

}
