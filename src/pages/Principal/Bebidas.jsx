import React from 'react';
import CategoryButton from '../../components/CategoryButton/CategoryButton';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RecipesBebidas from '../../components/RecipesContainer/RecipesBebidas';

const Bebidas = () => (
  <div>
    <Header title="Bebidas" />
    <CategoryButton />
    <RecipesBebidas />
    <Footer />
  </div>

);
export default Bebidas;
