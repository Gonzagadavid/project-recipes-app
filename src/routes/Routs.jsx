import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Bebidas, Comidas, Explore, Login, Perfil,
  ReceitasFavoritas, ReceitasFeitas,
  ExplorarBebidas, ExplorarComidas, ExplorarComidasArea,
  ProcessoComidas, ProcessoBebidas,
  ExplorarIngredientesComidas, ExplorarIngredientesBebidas,
  DetalhesComidas, DetalhesBebidas,
} from '../pages';
import NotFound from '../pages/NotFound/NotFound';

const Routs = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/comidas" component={ Comidas } />
    <Route exact path="/bebidas" component={ Bebidas } />
    <Route exact path="/comidas/:id" component={ DetalhesComidas } />
    <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
    <Route exact path="/explorar" component={ Explore } />
    <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
    <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
    <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
    <Route
      exact
      path="/explorar/comidas/ingredientes"
      component={ ExplorarIngredientesComidas }
    />
    <Route
      exact
      path="/explorar/bebidas/ingredientes"
      component={ ExplorarIngredientesBebidas }
    />
    <Route exact path="/perfil" component={ Perfil } />
    <Route exact path="/comidas/:id/in-progress" component={ ProcessoComidas } />
    <Route exact path="/bebidas/:id/in-progress" component={ ProcessoBebidas } />
    <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
    <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
    <Route path="*" component={ NotFound } />
  </Switch>
);

export default Routs;
