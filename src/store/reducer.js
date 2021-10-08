/*
 * @Author: YogurtQ
 * @Date: 2021-07-15 16:56:09
 * @LastEditors: YogurtQ
 * @LastEditTime: 2021-10-08 12:16:19
 * @Description: file content
 * @FilePath: \react-template\src\store\reducer.js
 */

const initialState = {
  counter: 0,
};

const counter = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'increment':
      return { counter: state.value + 1 };
    case 'descrment':
      return { counter: state.value - 1 };
    default:
      return state;
  }
};

export default counter;
