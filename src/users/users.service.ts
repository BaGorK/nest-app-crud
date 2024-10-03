import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  users: CreateUserDto[] = [
    { id: 1, name: 'john', age: 23 },
    { id: 2, name: 'Doe', age: 33 },
    { id: 3, name: 'bob', age: 12 },
  ];

  getAllUsers() {
    return {
      status: 'success',
      numOfResults: this.users.length,
      users: this.users,
    };
  }

  createUser(createUserDto: CreateUserDto) {
    const user = createUserDto;
    user.id = this.users.length + 1;
    this.users.push(user);

    return { status: 'success', data: { user } };
  }

  getUser(id: string) {
    const user = this.users.find((user) => user.id === +id);
    console.log(user);

    return { status: 'success', data: { user } };
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === +id);
    const user = {
      ...this.users[index],
      ...updateUserDto,
    };
    this.users[index] = user;

    return { status: 'success', data: { user } };
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== +id);

    return { status: 'success', data: null };
  }
}
