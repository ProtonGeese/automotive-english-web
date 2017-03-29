import { createNewLesson, listLessons, updateLesson, deleteLesson, getLesson } from '../app/models/lesson.jsx';

test('Test createNew', () => {
  expect(createNewLesson).toBeInstanceOf(Function);
});

test('Test list.', () => {
  expect(listLessons).toBeInstanceOf(Function);
});

test('Test update', () => {
  expect(updateLesson).toBeInstanceOf(Function);
});

test('Test delete', () => {
  expect(deleteLesson).toBeInstanceOf(Function);
});

test('Test get', () => {
  expect(getLesson).toBeInstanceOf(Function);
});
