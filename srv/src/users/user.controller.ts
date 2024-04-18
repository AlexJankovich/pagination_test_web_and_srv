import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';
import { ListParamsDto } from '../utils/list-params.dto';
import { ListDto } from '../utils/list.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Query() listParams: ListParamsDto): Promise<ListDto<UsersResponseDto>> {
    this.logger.log('Get slice of user list');
    const users = await this.userService.findSliceOfAllUsers(listParams);
    const formattedUsers: ListDto<UsersResponseDto> = {
      data: [...users.data.map((user) => UsersResponseDto.fromUsersEntity(user))],
      meta: users.meta,
      additionalData: undefined,
    };
    return formattedUsers;
  }

  @Get('all')
  async getAllUsers() {
    this.logger.log('Get all users');
    const users = await this.userService.findAll();
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }
}
