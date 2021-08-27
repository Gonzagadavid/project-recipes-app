import { string } from 'prop-types';
import React from 'react';

const Video = ({ strYoutube, strMeal }) => (
  <div>
    <h3>Video</h3>
    <iframe
      data-testid="video"
      src={ strYoutube.replace(/watch\?v=/g, 'embed/') }
      title={ strMeal }
      width="450"
      height="240"
    />
  </div>
);

export default Video;

Video.propTypes = {
  strYoutube: string.isRequired,
  strMeal: string.isRequired,
};
