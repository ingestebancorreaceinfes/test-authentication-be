import { BadRequestException, Logger } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

export class AzureFederation implements IFederation{
    public async tokenValidate(token: string): Promise<any> {
      const jwtService = new JwtService();

      type Payload = {
        tid : string
      }

      const { tid } = jwtService.decode(token) as Payload;

      const verify = (await import('azure-ad-verify-token')).verify;

      verify(token, {
        jwksUri: process.env.JWKURI,
        issuer: `https://login.microsoftonline.com/${tid}/v2.0`,
        audience: process.env.AZURE_CLIENT_ID,
      })
      .then((decoded) => {
        // verified and decoded token
        console.log(decoded);
      })
      .catch((error) => {
        // invalid token
        const logger = new Logger("AzureFederation");
        logger.error(error);
        throw new BadRequestException("Error de validación de token");
      });
    }
    
}