import { config, CognitoIdentityCredentials } from 'aws-sdk';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool, CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

/**
 * The global authentication state.
 */
var state  = {
  loggedIn: false,
  cognitoUser: null,
  region: 'us-east-1',
  userPoolId: 'us-east-1_qvCnCvSG1',
  clientId: '48tgssi54c96kuqiucjh18fokh',
  identityPoolId: 'us-east-1:28d6d573-ee26-415e-a0a1-75629e0000f5',
  loginEndpoint: 'cognito-idp.us-east-1.amazonaws.com/',
  userPool: null
};

export function resume(callback = {}) {
  var poolData = {
    UserPoolId: state.userPoolId,
    ClientId: state.clientId
  };

  state.userPool = new CognitoUserPool(poolData);
  state.cognitoUser = state.userPool.getCurrentUser();

  if (state.cognitoUser != null) {
    state.cognitoUser.getSession((err, session) => {
      if (!err) {
        config.region = state.region;

        config.update({
          credentials: new CognitoIdentityCredentials({
            IdentityPoolId: state.identityPoolId,
            Logins: {
              [state.loginEndpoint + state.userPoolId]: session.getIdToken().getJwtToken()
            }
          })
        });

        config.credentials.refresh((err) => {
          // AWS's error handling is incredibly consistent.
          if (err && 'onFailure' in callback) {
            callback.onFailure(err);
            return;
          }

          state.loggedIn = true;

          if ('onSuccess' in callback) {
            callback.onSuccess(session);
          }
        });

      } else {
        if ('onFailure' in callback) {
          callback.onFailure(err);
        }
      }
    });
  } else {
    if ('onFailure' in callback) {
      callback.onFailure('Could not resume session');
    }
  }
}

export function login(username, password, callback = {}) {
  var authenticationData = {
    Username : username,
    Password : password
  };

  var authenticationDetails = new AuthenticationDetails(authenticationData);

  var poolData = {
    UserPoolId: state.userPoolId,
    ClientId: state.clientId
  };

  state.userPool = new CognitoUserPool(poolData);

  var userData = {
    Username: username,
    Pool: state.userPool
  };

  state.cognitoUser = new CognitoUser(userData);

  state.cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      /*
       * References:
       * * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
       * * https://github.com/aws/amazon-cognito-identity-js
       * * https://forums.aws.amazon.com/thread.jspa?threadID=234024
       */

      // The region is required for all AWS API calls.
      config.region = state.region;

      // If assignment is used rather than the update method the credentials will
      // not be found on subsequent API calls.
      config.update({
        credentials: new CognitoIdentityCredentials({
          IdentityPoolId: state.identityPoolId,
          Logins: {
            [state.loginEndpoint + state.userPoolId]: result.getIdToken().getJwtToken()
          }
        })
      });

      // The credentials will remain unpopulated until there is a request to
      // refresh them.
      config.credentials.refresh((err) => {
        // AWS's error handling is incredibly consistent.
        if (err) {
          console.log(err);
          if ('onFailure' in callback) {
            callback.onFailure(err);
          }
        }

        state.loggedIn = true;

        if ('onSuccess' in callback) {
          callback.onSuccess();
        }
      });
    },
    onFailure: function(err) {
      console.log(err);

      if ('onFailure' in callback) {
        callback.onFailure(err);
      }
    },
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      /*
       * Note: Rather than pass a callback function to the client we could
       * expose a wrapper to completeNewPasswordChallenge that the client could
       * call in their handler.
       */
      if ('newPasswordRequired' in callback) {
        /*
         * 1. The client registers a callback for what to do when a new
         *    is required.
         * 2. The client is given a callback by /us/ to call with the new
         *    password.
         * 3. The client passes control back to this function to complete the
         *    password registration.
         * 4. We collect the result and pass control back to the client for
         *    the response to a success or failure.
         */
        callback.newPasswordRequired(function(newPassword, callback) {
          state.cognitoUser.completeNewPasswordChallenge(newPassword, null, {
            onSuccess: (result) => {
              if ('onSuccess' in callback) {
                callback.onSuccess(result);
              }
            },
            onFailure: (err) => {
              if ('onFailure' in callback) {
                callback.onFailure(err);
              }
            }
          });
        });
      }
    }
  });
}

export function isLoggedIn() {
  return state.loggedIn;
}

export function logout() {
  state.cognitoUser.signOut();
  state.loggedIn = false;
}
