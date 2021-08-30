import React from 'react';
import copy from 'clipboard-copy';
import { func, string } from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const ShareButton = ({ setCopied, id, ext }) => {
  const copyClipBoard = () => {
    const time = 3000;
    copy(`http://localhost:3000${ext}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, time);
  };

  return (
    <button type="button" onClick={ copyClipBoard }>
      <img src={ shareIcon } data-testid={ id } alt="share icon" />
    </button>
  );
};

export default ShareButton;

ShareButton.propTypes = {
  setCopied: func.isRequired,
  id: string.isRequired,
  ext: string.isRequired,
};
