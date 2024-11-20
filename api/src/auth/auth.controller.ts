import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Request, Response } from 'express';
import { CurrentUser } from './user.decorator';
import { User } from './entities/user.entity';
import { CurrentUserGuard } from './current-user.guard';

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

  // Route to return current authentication state
  @Get('authstatus')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser() user: User) {
    return { status: !!user, user}
  }

  // Route to logout the user
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('Authentication');
    res.clearCookie("IsAuthenticated");
    return res.status(200).send({ success: true })
  }

}
