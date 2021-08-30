import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Router } from 'react-router';
import thunk from 'redux-thunk';
import reducerRoot from '../../redux/reducers';

const getStore = (initialState) => {
  if (!initialState) return createStore(reducerRoot, applyMiddleware(thunk));
  return createStore(reducerRoot, initialState, applyMiddleware(thunk));
};

const renderWithRouterAndRedux = (component, route = '/', initialState) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const store = getStore(initialState);
  return ({
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  });
};

export default renderWithRouterAndRedux;
