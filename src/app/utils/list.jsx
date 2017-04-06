/**
 * Move an element down in an array safely.
 * @param {array} array - An array of elements.
 * @param {Number} index - The index of the element to move.
 * @returns {array} A new array with the element moved.
 */
export function moveDown(array, index) {
  var newArray = Array.from(array);
  var len = array.length;

  // Index isn't valid.
  if (index < 0 || index > len - 1) {
    return newArray;
  // Array is empty.
  } else if (len === 0) {
    return newArray;
  // Last element is selected.
  } else if (index === len - 1) {
    return newArray;
  }

  // Now we need to swap array[index] and array[index + 1].
  var tmp = newArray[index];
  newArray[index] = newArray[index + 1];
  newArray[index + 1] = tmp;

  return newArray;
}

/**
 * Move an element up in an array safely.
 * @param {array} array - An array of elements.
 * @param {Number} index - The index of the element to move.
 * @returns {array} A new array with the element moved.
 */
export function moveUp(array, index) {
  return moveDown(Array.from(array).reverse(), (array.length - 1) - index).reverse();
}
