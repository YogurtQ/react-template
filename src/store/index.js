/*
 * @Author: YornQiu
 * @Date: 2020-12-23 15:33:32
 * @LastEditors: YornQiu
 * @LastEditTime: 2021-10-08 12:15:51
 * @Description: file content
 * @FilePath: \react-template\src\store\index.js
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
