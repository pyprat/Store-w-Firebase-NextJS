import React from 'react';
import {css} from '@emotion/core';

const Error404 = () => {
    return (
        <h1 css = {css`
            text-align: center;
            margin-top: 5rem;
        `}
        >Hubo un error, ID no válido</h1>
    )
}

export default Error404;

