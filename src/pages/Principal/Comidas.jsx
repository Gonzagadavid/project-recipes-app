import React from 'react';
import CategoryButton from '../../components/CategoryButton/CategoryButton';
import { RecipesComidas, Header, Footer } from '../../components';

const Comidas = () => (
  <div>
    <Header title="Comidas" />
    <CategoryButton />
    <RecipesComidas />
    <Footer />
  </div>

);
export default Comidas;
