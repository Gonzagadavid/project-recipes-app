import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMIDAS_BY_NAME } from '../endPoints/comidas';
import fetchComidas from '../redux/fetchs/fetchsComidas/fetchComidas';
// import fetchNameComidas from '../redux/fetchs/fetchsComidas/fetchComidas';
// import fetchStaticComida from '../redux/fetchs/fetchsComidas/fetchStaticComidas';

const TestApi = () => {
  const comidas = useSelector((state) => state.reducerComidas.comidas);
  const error = useSelector((state) => state.reducerComidas.error);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={ () => dispatch(fetchComidas(COMIDAS_BY_NAME('Chicken'))) }
        >
          Fecth
        </button>
      </div>
      <div>
        {error || JSON.stringify(comidas)}
      </div>
    </div>
  );
};

export default TestApi;
