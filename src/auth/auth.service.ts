import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.email);

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.usersService.comparePasswords(
      createUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOne(createUserDto.email);

    if (existingUser) {
      throw new Error('User already exists.');
    }

    const { email, password } = createUserDto;
    const user = await this.usersService.create({ email, password });

    const payload = { username: user.username, sub: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
