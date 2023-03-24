import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { federationObjects } from './services/factory/FedarationObjects';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService, private jwtService: JwtService) {}

  @Post('validatelogin')
  validateFactory( @Body('token') token: string, @Body('loginprovider') loginprovider: string ){
    return this.authService.loginUser(token,federationObjects[loginprovider]); 
  }
}
