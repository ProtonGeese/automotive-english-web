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
        Value: params.email
      },
      {
        Name: 'custom:level',
        Value: params.level.toString()
      },
      {
        Name: 'custom:instructor',
        Value: params.instructor
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

export function listUsers(params, callback) {
  var opts = {
    UserPoolId: state.userPoolId
  };

  var c = new CognitoIdentityServiceProvider();
  c.listUsers(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function updateUser(params, callback) {
  var opts = {
    UserPoolId: state.userPoolId,
    Username: params.username,
    UserAttributes: [
      {
        Name: 'email',
        Value: params.email
      },
      {
        Name: 'email_verified',
        Value: 'true'
      },
      {
        Name: 'custom:level',
        Value: params.level.toString()
      },
      {
        Name: 'custom:instructor',
        Value: params.instructor
      }
    ]
  };

  var c = new CognitoIdentityServiceProvider();
  c.adminUpdateUserAttributes(opts, (err, data) => {
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

export function getUser(params, callback) {
  var opts = {
    UserPoolId: state.userPoolId,
    Username: params.username
  };

  var c = new CognitoIdentityServiceProvider();
  c.adminGetUser(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function disableUser(params, callback) {
  var opts = {
    UserPoolId: state.userPoolId,
    Username: params.username
  };

  var c = new CognitoIdentityServiceProvider();
  c.adminDisableUser(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function enableUser(params, callback) {
  var opts = {
    UserPoolId: state.userPoolId,
    Username: params.username
  };

  var c = new CognitoIdentityServiceProvider();
  c.adminEnableUser(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}
