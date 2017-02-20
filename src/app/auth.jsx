import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

var authState = {
  loggedIn: false,
  cognitoUser: null
}

export function login(username, password, options = {}) {
  var authenticationData = {
      Username : username,
      Password : password
  }

  var authenticationDetails = new AuthenticationDetails(authenticationData);

  var poolData = {
      UserPoolId : 'us-east-1_I1OVTqqaY',
      ClientId : '33lf72qoium8t96f8ra0cth6im'
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
      Config.credentials = new CognitoIdentityCredentials({
        Logins : {
          'cognito-idp.us-east-1.amazonaws.com/33lf72qoium8t96f8ra0cth6im' : result.getIdToken().getJwtToken()
        }
      });

      // Record that we've successfully logged in.
      authState.loggedIn = true;

      // Call the onSuccess hook.
      if ('onSuccess' in options) {
        options.onSuccess();
      }
    },
    onFailure: function(err) {
      // Log the failure for debugging.
      console.log(err);

      // Call the onFailure hook.
      if ('onFailure' in options) {
        options.onFailure(err);
      }
    }
  });
}

export function isLoggedIn() {
  return authState.loggedIn;
}

export function logout() {
  return authState.cognitoUser.signOut();
}
