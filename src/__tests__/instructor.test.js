import { createNewInstructor, listInstructors, updateInstructor, deleteInstructor, getInstructor } from '../app/models/instructor.jsx';

test('Test createNew', () => {
  expect(createNewInstructor).toBeInstanceOf(Function);
});

test('Test list.', () => {
  expect(listInstructors).toBeInstanceOf(Function);
});

test('Test update', () => {
  expect(updateInstructor).toBeInstanceOf(Function);
});

test('Test delete', () => {
  expect(deleteInstructor).toBeInstanceOf(Function);
});

test('Test get', () => {
  expect(getInstructor).toBeInstanceOf(Function);
});
