import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUpdateUser } from './dto/createUpdateUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ){}

  async findAll(): Promise<User[]>  {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({where:{id: id}});
  }

  async findBy(criteria: any): Promise<User[]> {
      return this.userRepository.find(criteria);
  }

  async store(data: CreateUpdateUser) {
      if((await this.userRepository.findAndCount({where:{email: data.email}}))[1] > 0)
          throw new BadRequestException("User already exists");
      const user = new User();
      
      // WARNING: In this case password is stored as PLAINTEXT
      // It is only for show how it works!!!
      Object.assign(user, data);

      return this.userRepository.save(user);
  }

  async update(id: string, data: CreateUpdateUser) {
    const user = await this.userRepository.findOne({where:{id}});
    if(!user) throw new NotFoundException();

    // WARNING: In this case password is stored as PLAINTEXT
    // It is only for show how it works!!!
    Object.assign(user, data);

    this.userRepository.update(id, user);
    return user;
  }

  async destroy(id: string) {
    const user = await this.userRepository.findOne({where:{id: id}});
    if(!user) throw new NotFoundException();
    this.userRepository.remove(user);
  }
}