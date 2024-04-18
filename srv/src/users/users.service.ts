import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { ListParamsDto } from '../utils/list-params.dto';
import { ListDto } from '../utils/list.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepo.find();
  }

  async findSliceOfAllUsers(listParams: ListParamsDto): Promise<ListDto<UsersEntity>> {
    const offset = (listParams.page - 1) * listParams.limit;

    const usersCount = await this.usersRepo.count();

    const usersPage = await this.usersRepo.find({
      skip: offset,
      take: Number(listParams.limit),
    });

    return new ListDto(usersPage, {
      page: listParams.page,
      itemsCount: usersCount,
      limit: listParams.limit,
    });
  }
}
