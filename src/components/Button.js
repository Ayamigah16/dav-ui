"use client";

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, text, type = 'button', color = 'blue', className = '' }) => {
    return (
        <button
            type={type}
            className={`bg-${color}-500 text-white p-2 rounded ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    color: PropTypes.string,
    className: PropTypes.string,
};

export default Button;