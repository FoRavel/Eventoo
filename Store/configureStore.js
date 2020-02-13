import {createStore, combineReducers } from 'redux';
import profileReducer from './Reducers/profileReducer';
import eventReducer from './Reducers/eventReducer';

export default createStore(combineReducers({profileReducer, eventReducer}));
