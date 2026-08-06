import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  httpService: any;
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(req: any) {
    const authorization = req.headers.authorization;

    return this.httpService.get('http://localhost:3000/user/profile', {
      headers: {
        Authorization: authorization,
      },
    });
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
