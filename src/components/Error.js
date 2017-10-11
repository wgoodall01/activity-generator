import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

const Error = ({label, onReset}) => (
  <div className="Error">
    <span className="Error_bang">!</span>
    <div className="Error_msg">{label}</div>
    <button className="Error_reset" onClick={onReset}>
      Try Again
    </button>
  </div>
);

Error.propTypes = {label: PropTypes.string};

export default Error;
