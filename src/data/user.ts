import { User } from 'src/users/user.entity';

export const userData: User[] = [
  {
    id: 1,
    name: 'john',
    username: 'john12',
    password: 'test123',
    email: 'john@test.com',
    dateOfBirth: new Date('2002-07-05'),
  },
  {
    id: 2,
    name: 'Doe',
    username: 'doe12',
    dateOfBirth: new Date('2003-07-05'),
    email: 'doe@test.com',
    password: 'test123',
  },
  {
    id: 3,
    name: 'bob',
    dateOfBirth: new Date('2020-07-05'),
    email: 'bob@test.com',
    password: 'test123',
    username: 'bob12',
  },
];
