import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducerRoot from '../reducers';

const store = createStore(reducerRoot, composeWithDevTools(applyMiddleware(thunk)));

export default store;
