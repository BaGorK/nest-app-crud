import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();

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
}
