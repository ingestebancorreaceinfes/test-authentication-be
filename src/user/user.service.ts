import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessages } from 'src/common/enum/error-messages.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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

  async store(data:CreateUserDto) {
      try{
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
      }catch(e){
        console.log(e);
        throw new InternalServerErrorException(ErrorMessages.INTERNAL_SERVER_ERROR)
      }
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

  async findByEmail(username: string) {
    try{
      const user = await this.userRepository.findOne({ where: { username }});      
      return user;
    }
    catch(error){
      throw new InternalServerErrorException(ErrorMessages.INTERNAL_SERVER_ERROR)
    }
  }
}