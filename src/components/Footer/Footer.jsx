import React from 'react';
import buttonsFooter from '../../data/buttonsFooter';
import ImgRedirect from '../ImgRedirect/ImgRedirect';
import './Footer.css';

const Footer = () => (
  <footer className="footer" data-testid="footer">
    {buttonsFooter.map(({ to, src, alt, id }) => (
      <ImgRedirect
        key={ id }
        to={ to }
        src={ src }
        alt={ alt }
        id={ id }
      />
    ))}
  </footer>
);

export default Footer;
