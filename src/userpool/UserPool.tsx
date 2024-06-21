import { CognitoUserPool } from 'amazon-cognito-identity-js';

const keys = require("../cognitokeys.json");

const poolData = {
    UserPoolId: keys.UserPoolId,
    ClientId: keys.ClientId
}

export default new CognitoUserPool(poolData);