import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducerRoot from '../../redux/reducers';

const getStore = (initialState) => {
  if (!initialState) return createStore(reducerRoot, applyMiddleware(thunk));
  return createStore(reducerRoot, initialState, applyMiddleware(thunk));
};

export default getStore;
