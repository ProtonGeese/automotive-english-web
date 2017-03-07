import { config, CognitoIdentityServiceProvider } from 'aws-sdk';

export function createNewUser(params, callback) {
  console.log(config.credentials);
  console.log(config.region);
  var opts = {
    UserPoolId: 'us-east-1_I1OVTqqaY',
    Username: params.username,
    DesiredDeliveryMediums: ['EMAIL'],
    TemporaryPassword: params.password,
    UserAttributes: [
      {
        Name: 'email',
        Value: params.username
      }
    ]
  };

  var c = new CognitoIdentityServiceProvider();
  c.adminCreateUser(opts, callback);
}
