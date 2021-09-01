import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Footer, SelectAreas, RecipesComidas } from '../../components';
import { COMIDAS_BY_AREA, COMIDAS_BY_NAME } from '../../endPoints/comidas';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';

const ExplorarComidasArea = () => {
  const [area, setArea] = useState('');
  const dispatch = useDispatch();

  const request = useCallback(async () => {
    if (!area) return;
    if (area === 'All') return dispatch(fetchComidas(COMIDAS_BY_NAME('')));
    dispatch(fetchComidas(COMIDAS_BY_AREA(area)));
  }, [area, dispatch]);

  useEffect(() => { request(); }, [request]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <SelectAreas onChange={ ({ target: { value } }) => setArea(value) } />
      <RecipesComidas />
      <Footer />
    </div>
  );
};

export default ExplorarComidasArea;
