import React from 'react';
import { useLocation } from 'react-router';
import copy from 'clipboard-copy';
import { func } from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const ShareButton = ({ setCopied }) => {
  const { pathname } = useLocation();

  const copyClipBoard = () => {
    const time = 3000;
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, time);
  };

  return (
    <button type="button" onClick={ copyClipBoard }>
      <img src={ shareIcon } data-testid="share-btn" alt="share icon" />
    </button>
  );
};

export default ShareButton;

ShareButton.propTypes = {
  setCopied: func.isRequired,
};
