import { createNewUser, listUsers, updateUser, deleteUser, getUser, disableUser, enableUser } from '../app/models/user.jsx';

test('Test createNew', () => {
  expect(createNewUser).toBeInstanceOf(Function);
});

test('Test list.', () => {
  expect(listUsers).toBeInstanceOf(Function);
});

test('Test update', () => {
  expect(updateUser).toBeInstanceOf(Function);
});

test('Test delete', () => {
  expect(deleteUser).toBeInstanceOf(Function);
});

test('Test get', () => {
  expect(getUser).toBeInstanceOf(Function);
});

test('Test disable', () => {
  expect(disableUser).toBeInstanceOf(Function);
});

test('Test enable', () => {
  expect(enableUser).toBeInstanceOf(Function);
});
