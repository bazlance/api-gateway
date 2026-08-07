import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }

  @Get('profile')
  getProfile(@Headers('authorization') authorization: string) {
    return this.usersService.getProfile(authorization);
  }

  @Get('search')
  search(
    @Headers('authorization') authorization: string,
    @Query('query') query: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.usersService.search(authorization, query, page, limit);
  }

  @Patch(':id')
  update(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(authorization, id, updateUserDto);
  }

  @Delete(':id')
  remove(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    return this.usersService.remove(authorization, id);
  }
}
