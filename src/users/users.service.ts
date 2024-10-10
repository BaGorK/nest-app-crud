import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { userData } from 'src/data/user';

@Injectable()
export class UsersService {
  users: User[] = userData;

  getAllUsers() {
    return {
      status: 'success',
      numOfResults: this.users.length,
      users: this.users,
    };
  }

  createUser(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      dateOfBirth: new Date(createUserDto.dateOfBirth),
    };
    this.users.push(user);

    return { status: 'success', data: { user } };
  }

  getUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    console.log(user);

    return { status: 'success', data: { user } };
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    const user: User = {
      ...this.users[index],
      ...updateUserDto,
      dateOfBirth: new Date(updateUserDto.dateOfBirth),
    };
    this.users[index] = user;

    return { status: 'success', data: { user } };
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);

    return { status: 'success', data: null };
  }
}
