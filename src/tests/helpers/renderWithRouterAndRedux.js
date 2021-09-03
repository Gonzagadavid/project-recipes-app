import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import getStore from './getStore';

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
