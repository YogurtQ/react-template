/*
 * @Author: QY
 * @Date: 2021-07-15 16:56:09
 * @LastEditors: QY
 * @LastEditTime: 2021-07-15 17:38:01
 * @Description: file content
 * @FilePath: \react-template\src\store\reducer.js
 */

const initialState = {
  counter: 0,
};

export const counter = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'increment':
      return { counter: state.value + 1 };
    case 'descrment':
      return { counter: state.value - 1 };
    default:
      return state;
  }
};
