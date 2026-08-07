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

      if (!err.response) {
        throw new BadGatewayException('User service is unavailable');
      }

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

  async search({
    authorization,
    query,
    page = 1,
    limit = 10,
  }: {
    authorization: string;
    query: string;
    page?: number;
    limit?: number;
  }) {
    try {
      console.log(authorization);
      console.log(query);
      console.log(page);
      console.log(limit);
      const { data } = await firstValueFrom(
        this.httpService.get(
          `http://localhost:3000/user/search?query=${query}&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: authorization,
            },
          },
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

  async update(
    authorization: string,
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(
          `http://localhost:3000/user/${id}`,
          updateUserDto,
          {
            headers: {
              Authorization: authorization,
            },
          },
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

  async remove(authorization: string, id: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`http://localhost:3000/user/${id}`, {
          headers: {
            Authorization: authorization,
          },
        }),
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
}
