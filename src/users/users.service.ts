import { BadGatewayException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          'http://localhost:3000/user/register',
          createUserDto,
        ),
      );

      return data;
    } catch (error) {
      const err = error as AxiosError;

      if (!err.response) {
        throw new BadGatewayException('User service is unavailable');
      }

      throw new HttpException(
        err.response?.data ?? 'Unknown error',
        err.response?.status ?? 500,
      );
    }
  }

  async getProfile(authorization: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('http://localhost:3000/user/profile', {
          headers: {
            Authorization: authorization,
          },
        }),
      );

      return data;
    } catch (error) {
      const err = error as AxiosError;

      throw new HttpException(
        err.response?.data ?? 'Unknown error',
        err.response?.status ?? 500,
      );
    }
  }

  async login(body: LoginDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post('http://localhost:3000/user/login', body),
      );

      return data;
    } catch (error) {
      const err = error as AxiosError;

      if (!err.response) {
        throw new BadGatewayException('User service is unavailable');
      }

      throw new HttpException(
        err.response?.data ?? 'Unknown error',
        err.response?.status ?? 500,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
