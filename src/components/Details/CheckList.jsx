import { func, number, objectOf, oneOfType, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { INITIAL_PROGRESS_RECIPE } from '../../constants';
import arrayValues from '../../functions/arrayValues';
import getLocalStorage from '../../services/localStorage/getLocalStorage';
import setLocalStorage from '../../services/localStorage/setLocalStorage';

function CheckList(props) {
  const { recipesFavorite, id, finish } = props;
  const { pathname } = useLocation();
  const bebida = /bebida/g.test(pathname);
  const key = bebida ? 'cocktails' : 'meals';
  const inProgressRecipes = getLocalStorage('inProgressRecipes')
  || INITIAL_PROGRESS_RECIPE;
  const list = arrayValues(recipesFavorite, 'strIngredient');
  const sizeList = arrayValues(recipesFavorite, 'strMeasure');
  const listProgressIniti = inProgressRecipes[key][id] || [];
  const [listProgress, setListProgress] = useState(listProgressIniti);
  const handlerClick = (event, index) => {
    const arrayList = listProgress.length ? listProgress : Array(list.length).fill(false);
    const newList = arrayList.map((item, i) => (i === index ? !item : item));
    setListProgress(newList);
    inProgressRecipes[key][id] = newList;
    setLocalStorage('inProgressRecipes', inProgressRecipes);
  };

  useEffect(() => {
    const completed = new Set(listProgress).size === 1;
    if (completed) return finish(true);
    finish(false);
  }, [finish, listProgress]);

  return (
    <ul>
      {list.map((ingredient, index) => {
        const textstyle = !listProgress[index] ? 'none' : 'line-through';
        return (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <label
              htmlFor={ index }
            >
              <input
                id={ index }
                type="checkbox"
                key={ index }
                onChange={ (event) => handlerClick(event, index) }
                checked={ listProgress[index] }
              />
              <span
                style={ { textDecoration: textstyle } }
              >
                {`${ingredient} ${sizeList[index] || ''}`}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default CheckList;

CheckList.propTypes = {
  recipesFavorite: oneOfType([objectOf(string), string]).isRequired,
  id: oneOfType([number, string]).isRequired,
  finish: func.isRequired,
};
