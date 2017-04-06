import { moveUp, moveDown } from '../app/utils/list.jsx';

describe('moveUp on empty array', () => {
  var array = [];

  test('Beginning of array', () => {
    expect(moveUp(array, 0)).toEqual([]);
  });

  test('End of array', () => {
    expect(moveUp(array, array.length - 1)).toEqual([]);
  });

  test('Negative index', () => {
    expect(moveUp(array, -1)).toEqual([]);
  });

  test('Index beyond length', () => {
    expect(moveUp(array, array.length)).toEqual([]);
  });

  test('Second element.', () => {
    expect(moveUp(array, 1)).toEqual([]);
  });
});

describe('moveDown on empty array', () => {
  var array = [];

  test('Beginning of array', () => {
    expect(moveDown(array, 0)).toEqual([]);
  });

  test('End of array', () => {
    expect(moveDown(array, array.length - 1)).toEqual([]);
  });

  test('Negative index', () => {
    expect(moveDown(array, -1)).toEqual([]);
  });

  test('Index beyond length', () => {
    expect(moveDown(array, array.length)).toEqual([]);
  });

  test('Second element.', () => {
    expect(moveDown(array, 1)).toEqual([]);
  });
});

describe('moveUp on single element', () => {
  var array = [1];

  test('Beginning of array', () => {
    expect(moveUp(array, 0)).toEqual([1]);
  });

  test('End of array', () => {
    expect(moveUp(array, array.length - 1)).toEqual([1]);
  });

  test('Negative index', () => {
    expect(moveUp(array, -1)).toEqual([1]);
  });

  test('Index beyond length', () => {
    expect(moveUp(array, array.length)).toEqual([1]);
  });

  test('Second element.', () => {
    expect(moveUp(array, 1)).toEqual([1]);
  });
});

describe('moveDown on single element', () => {
  var array = [1];

  test('Beginning of array', () => {
    expect(moveDown(array, 0)).toEqual([1]);
  });

  test('End of array', () => {
    expect(moveDown(array, array.length - 1)).toEqual([1]);
  });

  test('Negative index', () => {
    expect(moveDown(array, -1)).toEqual([1]);
  });

  test('Index beyond length', () => {
    expect(moveDown(array, array.length)).toEqual([1]);
  });

  test('Second element.', () => {
    expect(moveDown(array, 1)).toEqual([1]);
  });
});

describe('moveUp on two elements', () => {
  var array = [1, 2];

  test('Beginning of array', () => {
    expect(moveUp(array, 0)).toEqual([1, 2]);
  });

  test('End of array', () => {
    expect(moveUp(array, array.length - 1)).toEqual([2, 1]);
  });

  test('Negative index', () => {
    expect(moveUp(array, -1)).toEqual([1, 2]);
  });

  test('Index beyond length', () => {
    expect(moveUp(array, array.length)).toEqual([1, 2]);
  });

  test('Second element.', () => {
    expect(moveUp(array, 1)).toEqual([2, 1]);
  });
});

describe('moveDown on two elements', () => {
  var array = [1, 2];

  test('Beginning of array', () => {
    expect(moveDown(array, 0)).toEqual([2, 1]);
  });

  test('End of array', () => {
    expect(moveDown(array, array.length - 1)).toEqual([1, 2]);
  });

  test('Negative index', () => {
    expect(moveDown(array, -1)).toEqual([1, 2]);
  });

  test('Index beyond length', () => {
    expect(moveDown(array, array.length)).toEqual([1, 2]);
  });

  test('Second element.', () => {
    expect(moveDown(array, 1)).toEqual([1, 2]);
  });
});

describe('moveUp on many elements', () => {
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  test('Beginning of array', () => {
    expect(moveUp(array, 0)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('End of array', () => {
    expect(moveUp(array, array.length - 1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
  });

  test('Negative index', () => {
    expect(moveUp(array, -1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Index beyond length', () => {
    expect(moveUp(array, array.length)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Second element', () => {
    expect(moveUp(array, 1)).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Interior element', () => {
    expect(moveUp(array, 5)).toEqual([0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
  });
});

describe('moveDown on many elements', () => {
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  test('Beginning of array', () => {
    expect(moveDown(array, 0)).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('End of array', () => {
    expect(moveDown(array, array.length - 1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Negative index', () => {
    expect(moveDown(array, -1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Index beyond length', () => {
    expect(moveDown(array, array.length)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Second element', () => {
    expect(moveDown(array, 1)).toEqual([0, 2, 1, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Interior element', () => {
    expect(moveDown(array, 5)).toEqual([0, 1, 2, 3, 4, 6, 5, 7, 8, 9]);
  });
});

test('moveUp identity test', () => {
  var array = [0, 1, 2, 3, 4];
  expect(moveUp(array, 2)).not.toBe(array);
});

test('moveDown identity test', () => {
  var array = [0, 1, 2, 3, 4];
  expect(moveDown(array, 2)).not.toBe(array);
});
