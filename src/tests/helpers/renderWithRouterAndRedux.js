import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router';
import reducerRoot from '../../redux/reducers';

const renderWithRouterAndRedux = (component, initialState) => {
  const history = createMemoryHistory();
  const store = createStore(reducerRoot, initialState);
  return ({
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  });
};

export default renderWithRouterAndRedux;
