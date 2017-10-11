import React from 'react';
import PropTypes from 'prop-types';

import './OpenWithOverleaf.css';

const OpenWithOverleaf = ({text, onReset}) => (
  <form
    className="OpenWithOverleaf"
    action="https://www.overleaf.com/docs"
    method="post"
    target="_blank"
  >
    <div className="OpenWithOverleaf_done">Done!</div>
    <textarea hidden name="snip" value={text} readOnly />
    <input hidden type="checkbox" name="splash" value={false} />
    <input className="OpenWithOverleaf_button" type="submit" value="Open in Overleaf" />
    <button onClick={onReset} className="OpenWithOverleaf_reset">
      Reset
    </button>
  </form>
);

OpenWithOverleaf.propTypes = {text: PropTypes.string};

export default OpenWithOverleaf;
