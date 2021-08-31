import React from 'react';
import CategoryButton from '../../components/CategoryButton/CategoryButton';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RecipesComidas from '../../components/RecipesContainer/RecipesComidas';

const Comidas = () => (
  <div>
    <Header title="Comidas" />
    <CategoryButton />
    <RecipesComidas />
    <Footer />
  </div>

);
export default Comidas;
