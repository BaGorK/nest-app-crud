import { UpdateUserDto } from '../dtos/update-user.dto';

export interface QueryType extends UpdateUserDto {
  search?: string;
  limit?: string;
  page?: string;
  sort?: string;
}
