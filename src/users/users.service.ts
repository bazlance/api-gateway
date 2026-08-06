import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(authorization: string) {
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
