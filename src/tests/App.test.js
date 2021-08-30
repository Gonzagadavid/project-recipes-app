import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

test('Farewell, front-end', () => {
  renderWithRouterAndRedux(<App />);
});
