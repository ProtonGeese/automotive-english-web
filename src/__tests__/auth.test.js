
import { login, resume, logout, isLoggedIn } from '../app/models/auth.jsx';

test('Test login', () => {
  expect(login).toBeInstanceOf(Function);
});

test('Test logout.', () => {
  expect(logout).toBeInstanceOf(Function);
});

test('Test resume', () => {
  expect(resume).toBeInstanceOf(Function);
});

test('Test isLoggedIn', () => {
  expect(isLoggedIn).toBeInstanceOf(Function);
});
