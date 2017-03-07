import { config, CognitoIdentityCredentials } from 'aws-sdk';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool, CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

var authState = {
  loggedIn: false,
  cognitoUser: null
};

export function login(username, password, options = {}) {
  var authenticationData = {
    Username : username,
    Password : password
  };

  var authenticationDetails = new AuthenticationDetails(authenticationData);

  var poolData = {
    UserPoolId : 'us-east-1_qvCnCvSG1',
    ClientId : '48tgssi54c96kuqiucjh18fokh'
  };

  var userPool = new CognitoUserPool(poolData);

  var userData = {
    Username : username,
    Pool : userPool
  };

  authState.cognitoUser = new CognitoUser(userData);

  authState.cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      // Save the credentials to the browser.
      config.region = 'us-east-1';
      config.update({
        credentials: new CognitoIdentityCredentials({
          IdentityPoolId: 'us-east-1:28d6d573-ee26-415e-a0a1-75629e0000f5',
          Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_qvCnCvSG1' : result.getIdToken().getJwtToken()
          }
        })
      });

      config.credentials.refresh((err) => {
        if (err) {
          alert(err);
        }
        // Record that we've successfully logged in.
        authState.loggedIn = true;

        console.log(config.credentials);

        // Call the onSuccess hook.
        if ('onSuccess' in options) {
          options.onSuccess();
        }
      });
    },
    onFailure: function(err) {
      // Log the failure for debugging.
      console.log(err);

      // Call the onFailure hook.
      if ('onFailure' in options) {
        options.onFailure(err);
      }
    },
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      if ('newPasswordRequired' in options) {
        options.newPasswordRequired(function(newPassword, callback) {
          authState.cognitoUser.completeNewPasswordChallenge(newPassword, null, {
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
  return authState.loggedIn;
}

export function logout() {
  authState.cognitoUser.signOut();
  authState.loggedIn = false;
}
