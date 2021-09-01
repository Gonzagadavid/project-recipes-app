import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import fetchStaticBebidas from '../../redux/fetchs/fetchsBebidas/fetchStaticBebidas';
import { BEBIDAS_BY_CATEGORY, BEBIDAS_BY_NAME, BEBIDAS_CATEGORIES }
  from '../../endPoints/bebidas';
import fetchStaticComida from '../../redux/fetchs/fetchsComidas/fetchStaticComidas';
import { COMIDAS_BY_CATEGORY, COMIDAS_BY_NAME, COMIDAS_CATEGORIES }
  from '../../endPoints/comidas';
import fetchBebidas from '../../redux/fetchs/fetchsBebidas/fetchBebidas';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';
import { FIVE } from '../../constants';

function CategoryButton() {
  const [toggle, setToggle] = useState('');
  const { pathname } = useLocation();
  const bebidasPath = /bebidas/g.test(pathname);
  const dispatch = useDispatch();
  const categoriasBebidas = useSelector((state) => state.reducerBebidas.categorias);
  const categoriasComidas = useSelector((state) => state.reducerComidas.categorias);
  const category = bebidasPath ? categoriasBebidas : categoriasComidas;
  const fetchFilter = bebidasPath ? fetchBebidas : fetchComidas;
  useEffect(() => {
    dispatch(fetchStaticBebidas(BEBIDAS_CATEGORIES));
    dispatch(fetchStaticComida(COMIDAS_CATEGORIES));
  }, [dispatch]);

  const categoryAll = () => {
    const endPointFilter = bebidasPath ? BEBIDAS_BY_NAME : COMIDAS_BY_NAME;
    dispatch(fetchFilter(endPointFilter('')));
  };

  useEffect(() => {
    if (!toggle) return;
    const endPointFilter = bebidasPath ? BEBIDAS_BY_CATEGORY : COMIDAS_BY_CATEGORY;
    dispatch(fetchFilter(endPointFilter(toggle)));
  }, [fetchFilter, bebidasPath, dispatch, toggle]);

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => categoryAll() }
      >
        All
      </button>
      {category.length > 0 && category.map(({ strCategory }, index) => (
        index < FIVE && (
          <label htmlFor={ `${strCategory}${index}` } key={ index }>
            <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              name={ strCategory }
              onClick={ () => (
                strCategory === toggle ? categoryAll() : setToggle(strCategory)) }
            >
              { strCategory }
            </button>
          </label>
        )
      ))}
    </div>
  );
}

export default CategoryButton;
