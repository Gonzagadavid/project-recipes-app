import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { func } from 'prop-types';
import { Select } from '../Forms';
import fetchStaticComida from '../../redux/fetchs/fetchsComidas/fetchStaticComidas';
import { COMIDAS_AREAS } from '../../endPoints/comidas';

const SelectAreas = ({ onChange }) => {
  const regioes = useSelector((state) => state.reducerComidas.regioes);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(fetchStaticComida(COMIDAS_AREAS)); }, [dispatch]);

  if (!regioes.length) return <p>loading...</p>;

  const regioesOptions = regioes.map(({ strArea }) => strArea);
  return (
    <Select
      labelText="Por Area"
      id="explore-by-area-dropdown"
      onChange={ onChange }
      options={ ['All', ...regioesOptions] }
    />
  );
};

export default SelectAreas;

SelectAreas.propTypes = {
  onChange: func.isRequired,
};
