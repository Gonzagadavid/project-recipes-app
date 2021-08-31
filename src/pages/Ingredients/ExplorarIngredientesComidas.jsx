import React from 'react';
import HeaderWithoutSearch from '../../components/Header/HeaderWithoutSearch';
import Footer from '../../components/Footer/Footer';
import IngredientesContainer
  from '../../components/IngredientsContainer/IngredientesContainer';

const ExplorarIngredientesComidas = () => (
  <div>
    <HeaderWithoutSearch title="Explorar Ingredientes" />
    <IngredientesContainer />
    <Footer />
  </div>

);

export default ExplorarIngredientesComidas;
