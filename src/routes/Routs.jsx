import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Bebidas, Comidas, Explore, Login, Perfil, ReceitasFavoritas, ReceitasFeitas,
} from '../pages';

const Routs = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/comidas" component={ Comidas } />
    <Route path="/bebidas" component={ Bebidas } />
    <Route path="/explorar" component={ Explore } />
    <Route path="/perfil" component={ Perfil } />
    <Route path="/receitas-feitas" component={ ReceitasFeitas } />
    <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
  </Switch>
);

export default Routs;
