import React from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/Header/HeaderWithoutSearch';
import { Button } from '../../components/Forms';
import Footer from '../../components/Footer/Footer';

const Explore = () => (
  <div>
    <HeaderWithoutSearch title="Explorar" />
    <Link to="/explorar/comidas">
      <Button
        id="explore-food"
        text="Explorar Comidas"
      />
    </Link>
    <Link to="/explorar/bebidas">
      <Button
        id="explore-drinks"
        text="Explorar Bebidas"
      />
    </Link>
    <Footer />
  </div>

);
export default Explore;
