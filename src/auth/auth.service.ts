import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/common/enum/error-messages.enum';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';
import { CreatorFactory } from './services/factory/CreatorFactory';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
  ){}
  
  async login({
    email,
    name,
    image,
  }: {
    email: string;
    name: string;
    image?: string;
  }): Promise<any> {
    if((await this.usersService.findBy({ where: { email: email } }))[0])
          throw new BadRequestException("User already exists");
      const user = new User();
      
      Object.assign(user, {email,name,image});

      return await this.usersService.store(user);
  }

  async loginUser(token:string, creatorFactory:CreatorFactory) {
    const isTokenValid = await creatorFactory.checkToken(token);//CreateAzureFederation instead of creatorFactory
    if(!isTokenValid){
      throw new BadRequestException(ErrorMessages.NOT_VALID_TOKEN)
    }
  }

  async registerUser(token: string){
    console.log(token);
  }
   
}