import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ONE_LETTER } from '../../constants';
import inputsRadios from '../../data/inputsRadios';
import { checkOneLetter, filterBebidas, filterComidas } from '../../functions';
import fetchBebidas from '../../redux/fetchs/fetchsBebidas/fetchBebidas';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';
import { Button, Input } from '../Forms';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const bebidasPath = /bebidas/g.test(pathname);
  const recipesBebidas = useSelector((state) => state.reducerBebidas.bebidas);
  const recipesComidas = useSelector((state) => state.reducerComidas.comidas);

  useEffect(() => {
    const [one] = recipesBebidas;
    if (recipesBebidas.length === 1) history.push(`bebidas/${one.idDrink}`);
  }, [recipesBebidas, history]);

  useEffect(() => {
    const [one] = recipesComidas;
    if (recipesComidas.length === 1) history.push(`comidas/${one.idMeal}`);
  }, [recipesComidas, history]);

  const getMeals = () => {
    if (checkOneLetter(filter, search)) return global.alert(ONE_LETTER);
    const filterRequest = bebidasPath ? filterBebidas : filterComidas;
    const fetchRequest = bebidasPath ? fetchBebidas : fetchComidas;
    const endPoint = filterRequest(filter)(search);
    dispatch(fetchRequest(endPoint));
  };

  return (
    <div>
      <Input
        labelText="Buscar Receita"
        id="search-input"
        type="text"
        onChange={ ({ target: { value } }) => setSearch(value) }
        value={ search }
      />
      {inputsRadios.map(({ labelText, id, params }) => (
        <Input
          labelText={ labelText }
          id={ id }
          type="radio"
          name="filter"
          onChange={ () => setFilter(params) }
          key={ id }
        />
      ))}
      <Button
        text="Buscar"
        id="exec-search-btn"
        onClick={ getMeals }
      />
    </div>
  );
};
export default SearchBar;
