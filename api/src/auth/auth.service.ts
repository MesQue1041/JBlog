import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>, 
    private jwtService : JwtService) {}

  async login(loginDto : UserLoginDto) {
    const user = await 
    this.repo.createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email: loginDto.email}).getOne();


    if (!user) {
      throw new UnauthorizedException('Bad Credentials');
    } else {
      // verify that the supplied password hash is matching with the hash in database
      if (await this.verifyPassword(loginDto.password, user.password)) {
        const token = this.jwtService.signAsync({
          email: user.email,
          id: user.id
        });
        delete user.password;
        return { token, user };
      }
      else {
        throw new UnauthorizedException("Bad Credentials")
      }
    }
  }
  

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);

  }
}
