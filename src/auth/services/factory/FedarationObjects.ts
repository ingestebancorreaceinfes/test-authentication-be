import { CreateAzureFederation } from "./CreateAzureFederation";
import { CreateGoogleFederation } from "./CreateGoogleFederation";

export const federationObjects = {
    "googleTokenValidation": new CreateGoogleFederation(),
    "azureTokenValidation": new CreateAzureFederation()
}