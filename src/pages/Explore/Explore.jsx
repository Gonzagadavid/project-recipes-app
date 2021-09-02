import React from 'react';
import { Link } from 'react-router-dom';
import { Button, HeaderWithoutSearch, Footer } from '../../components';
import './Explore.css';

const Explore = () => (
  <div className="Explore">
    <HeaderWithoutSearch title="Explorar" />
    <img
      className="imagem-explore"
      src="https://media.discordapp.net/attachments/879414910520533016/883093536919154758/telaExplorar.png"
      alt="Gabi Guerra tirando foto do almoço com celular"
    />
    <div className="button-container">
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
    </div>
    <Footer />
  </div>

);
export default Explore;
