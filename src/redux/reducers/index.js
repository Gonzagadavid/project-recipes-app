import { combineReducers } from 'redux';
import reducerBebidas from './reducerBebidas';
import reducerComidas from './reducerComidas';
import reducerUser from './reducerUser';

const reducerRoot = combineReducers({ reducerBebidas, reducerComidas, reducerUser });

export default reducerRoot;
