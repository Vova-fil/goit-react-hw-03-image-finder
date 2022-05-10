import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button.styled.js';

const ButtonLoadMore = ({ onClick }) => (
  <Button type="button" onClick={onClick} className="Button-container">
    Load more...
  </Button>
);

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonLoadMore;
