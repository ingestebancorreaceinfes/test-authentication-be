import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/common/enum/error-messages.enum';
import { UsersService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreatorFactory } from './services/factory/CreatorFactory';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}
  
  async loginUser(token:string, creatorFactory:CreatorFactory) {
    const payload = await creatorFactory.checkToken(token);//CreateAzureFederation instead of creatorFactory
    if(!payload){
      throw new BadRequestException(ErrorMessages.NOT_VALID_TOKEN)
    }
    let user = await this.usersService.findByEmail(payload.email);

    if(!user){
      const createUserDto:CreateUserDto = {
          username:payload.email,
          password:null,
          full_name: payload.full_name,
          image_url: payload.picture,
          sub:payload.sub,
          is_active: true
      }
      user = await this.usersService.store(createUserDto);
    }
    const access_token = this.jwtService.sign({ username: payload.email }, {secret: process.env.JWT_SECRET })
    return {...user,access_token}
  }

  async registerUser(token: string){
    console.log(token);
  }
   
}