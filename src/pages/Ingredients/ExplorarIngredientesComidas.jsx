import React from 'react';
import { IngredientesComidas, Footer, HeaderWithoutSearch } from '../../components';

const ExplorarIngredientesComidas = () => (
  <div>
    <HeaderWithoutSearch title="Explorar Ingredientes" />
    <IngredientesComidas />
    <Footer />
  </div>

);

export default ExplorarIngredientesComidas;
