import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUserDTO } from './responseSwagger/response';
import { ResponseErrorDTO } from '../auth/responseSwagger/response';
import { IsAdminGuard } from '../auth/auth.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Created', type: ResponseUserDTO })
  @ApiResponse({
    status: 400,
    description: 'username or password invalid',
    type: ResponseErrorDTO,
  })
  @ApiResponse({ status: 400, description: 'Username already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: ResponseUserDTO,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Ok', type: ResponseUserDTO })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  @ApiResponse({ status: 404, description: 'Id invalid' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'Ok', type: ResponseUserDTO })
  @ApiResponse({ status: 400, description: 'username or password invalid' })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  @ApiResponse({ status: 404, description: 'Id invalid' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  @ApiResponse({ status: 404, description: 'Id invalid' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
