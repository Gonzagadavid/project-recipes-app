import { string } from 'prop-types';
import React from 'react';
import './Message.css';

const Message = ({ msg }) => (
  <div className="Message">
    <h3>{msg}</h3>
  </div>
);

export default Message;

Message.propTypes = {
  msg: string.isRequired,
};
