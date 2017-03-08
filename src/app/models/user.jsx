import { CognitoIdentityServiceProvider } from 'aws-sdk';

var state = {
  userPoolId: 'us-east-1_I1OVTqqaY',
};

export function createNewUser(params, callback) {
  var opts = {
    UserPoolId: state.userPoolId,
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
  c.adminCreateUser(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function deleteUser(params, callback) {
  var opts = {
    UserPoolId: state.userPoolId,
    Username: params.username
  };

  var c = new CognitoIdentityServiceProvider();
  c.adminDeleteUser(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });  
}
