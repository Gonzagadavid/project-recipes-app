import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const Alert = () => {
  const [error, setError] = useState('');
  const errorComida = useSelector((state) => state.reducerComidas.error);
  const errorBebida = useSelector((state) => state.reducerBebidas.error);

  useEffect(() => { setError(errorComida); }, [errorComida]);
  useEffect(() => { setError(errorBebida); }, [errorBebida]);

  if (!error) return null;
  return (
    <div>
      <h2>Error</h2>
      <p data-testid="error-msg">{error}</p>
      <button type="button" onClick={ () => setError('') } data-testid="alert-btn">
        OK
      </button>
    </div>
  );
};

export default Alert;
