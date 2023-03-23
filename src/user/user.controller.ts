import { Controller, Get, Post, Body, Param, Delete, UseGuards, NotFoundException, Put, HttpCode } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUpdateUser } from './dto/createUpdateUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async show(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() data: CreateUpdateUser) {
    return await this.userService.store(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() data: CreateUpdateUser) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async destroy(@Param('id') id: string) {
    await this.userService.destroy(id);
    return;
  }
}
