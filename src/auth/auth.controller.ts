import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { federationObjects } from './services/factory/FedarationObjects';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService, private jwtService: JwtService) {}

  @Post('loginMicrosoft')
  async loginByMicrosoft(@Body('token') token): Promise<any>{
    console.log(token);
    type Payload = {
      tid: string,
      preferred_username: string,
      name: string
    }

    const { tid } = this.jwtService.decode(token) as Payload;
    // const tokenIncorrect = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkZjFmOTQ1ZmY5MDZhZWFlZmE5M2MyNzY5OGRiNDA2ZDYwNmIwZTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDkzNjMzMjQ5MTcwLTA3bG5yNWxvbDRnbDI1MW8xZnFyaDhqYzk4NmszZjlzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDkzNjMzMjQ5MTcwLTA3bG5yNWxvbDRnbDI1MW8xZnFyaDhqYzk4NmszZjlzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NTY4MzIyMzcwNjk5MDc4Mzc4IiwiZW1haWwiOiJlc3RlYmFuY29ycmVhNDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiM3RMSWwzVmpCRVBIQTVRaExsMjJzQSIsIm5hbWUiOiJFc3RlYmFuIENvcnJlYSBQZXJlaXJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFkzaXoxRzFTcE9yYUctVFlUY0lCZEZhRHZyRzZfZHRPNUR0cEdockE9czk2LWMiLCJnaXZlbl9uYW1lIjoiRXN0ZWJhbiIsImZhbWlseV9uYW1lIjoiQ29ycmVhIFBlcmVpcmEiLCJsb2NhbGUiOiJlcy00MTkiLCJpYXQiOjE2Nzg1NzMyNjMsImV4cCI6MTY3ODU3Njg2MywianRpIjoiODU2MDcwMDQzNjZiODhkZjQ1YWFkNDMwNzU1MzJjM2Q5ZWU0NTBiMCJ9.dBJneBQlr0ewSXvm7VID_b6C8DYC_QT0ZzhYG0hnACRczsnVtq4ryzca2owaF0adrkVZfQ_Eq2LEJ_CNMnAK-wGhPxm8BAga5DnZ5jbsZNHTnmNULI371lA2Y2xrqpldfALqeY_kOKoepZRJr2eeVKZHzOIWGXCrWtyA808-BzGGgr4c8mM5VvGvFBZDZy0blcuYBQnhGcf28EcJwksTZf0XkHREYDqfJg8qpEqN18B8dzjGDNrRtYp79DNjPMHdZ1AQ8G0EtbY9GDEP2n6kosFaaOEa7cYRWy0MgDZooapSqWXX_CfHJU5tbLbJ7lfFkhjR2ywV8ug0ONgXV2bbnw';
    const verify = (await import('azure-ad-verify-token')).verify;

    verify(token, {
      jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
      issuer: `https://login.microsoftonline.com//v2.0`,
      audience: '278092c6-6e54-4c5b-9383-9c23321331f7',
    })
      .then((decoded) => {
        // verified and decoded token
        console.log(decoded);
        const typeDecode = decoded as Payload;
        console.log(typeDecode.name);
        console.log(typeDecode.preferred_username);
        
        const data = this.authService.login({
          email: typeDecode.preferred_username,
          name: typeDecode.name,
          image: ''
        })

        return data;
      })
      .catch((error) => {
        // invalid token
        console.error(error);
      });
  }

  @Post('validatelogin')
  validateFactory( @Body('token') token: string, @Body('loginprovider') loginprovider: string ){
    return this.authService.loginUser(token,federationObjects[loginprovider]); 
  }
}
