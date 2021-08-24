import { combineReducers } from 'redux';
import reducerBebidas from './reducerBebidas';
import reducerComidas from './reducerComidas';

const reducerRoot = combineReducers({ reducerBebidas, reducerComidas });

export default reducerRoot;
