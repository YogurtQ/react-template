/*
 * @Author: QY
 * @Date: 2020-12-23 15:33:32
 * @LastEditors: QY
 * @LastEditTime: 2021-07-15 17:14:03
 * @Description: file content
 * @FilePath: \react-template\src\store\index.js
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
