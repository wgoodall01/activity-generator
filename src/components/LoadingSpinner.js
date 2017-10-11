import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

const LoadingSpinner = ({label}) => (
  <div className="LoadingSpinner">
    <div className="LoadingSpinner_spinner" />
    <div className="LoadingSpinner_msg">{label}</div>
  </div>
);

LoadingSpinner.propTypes = {
  label: PropTypes.string
};

export default LoadingSpinner;
