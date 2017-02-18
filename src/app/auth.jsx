var auth = {
  loggedIn: false
}

export function login() {
  auth.loggedIn = true;
}

export function isLoggedIn() {
  return auth.loggedIn;
}

export function logout() {
  auth.loggedIn = false;
}
