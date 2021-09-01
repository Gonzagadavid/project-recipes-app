import React from 'react';
import CategoryButton from '../../components/CategoryButton/CategoryButton';
import { RecipesBebidas, Header, Footer } from '../../components';

const Bebidas = () => (
  <div>
    <Header title="Bebidas" />
    <CategoryButton />
    <RecipesBebidas />
    <Footer />
  </div>

);
export default Bebidas;
