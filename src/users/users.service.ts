import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Like, MoreThan, Repository } from 'typeorm';
import { QueryType } from './interfaces/user.interface';
import { UsersController } from './users.controller';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(query: QueryType) {
    console.log('query : ', query);
    const users = await this.userRepository.find();

    this.logger.debug(`Found ${users.length} users`);

    return {
      status: 'success',
      numOfResults: await this.userRepository.count(),
      data: {
        users,
      },
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const { dateOfBirth, email, name, password, username } = createUserDto;

    const user = await this.userRepository.save({
      name,
      username,
      password,
      email,
      dateOfBirth: new Date(dateOfBirth),
    });

    return { status: 'success', data: { user } };
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User not found. id: ${id}`);

    return { status: 'success', data: { user } };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User not found. id: ${id}`);

    const dateOfBirth = updateUserDto.dateOfBirth
      ? new Date(updateUserDto.dateOfBirth)
      : user.dateOfBirth;

    user = await this.userRepository.save({
      ...user,
      ...updateUserDto,
      dateOfBirth,
    });

    return { status: 'success', data: { user } };
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User not found. id: ${id}`);

    await this.userRepository.remove(user);

    return { status: 'success', data: null };
  }

  /*
  SELECT * FROM user WHERE (
    user.id > 3 AND user.dateOfBirth > '2001-02-12T13:00:00' )
    OR user.username LIKE '%jo%'
  ORDER BY user.id DESK
  LIMIT 2
  */
  async practice() {
    return await this.userRepository.find({
      // select: ['id', 'dateOfBirth'],
      where: [
        {
          id: MoreThan(3),
          dateOfBirth: LessThan(new Date('2001-02-12T13:00:00')),
        },
        {
          username: Like('%jo%'),
        },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }
}

/*
ADVANCED TYPEORM OPTIONS

import {MoreThan} from 'typeorm'
SELECT * FROM user Where id = 3
  => await this.userRepository.find({where: {id: 3}});

SELECT * FROM user Where id > 3
  => await this.userRepository.find({where: {id: MoreThan(3)}});

SELECT * FROM user Where id > 3 AND dateOfBirth > '2000-05-04'
  => await this.userRepository.find({where: {id: MoreThan(3), dateOfBirth: MoreThan('2000-05-04')}});
*/
