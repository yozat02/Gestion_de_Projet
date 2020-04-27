import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title/Title';


export default function Block(props) {

    return (
        <React.Fragment>
            <Title>      {props.children}</Title>
        </React.Fragment>
    );
}

Block.propTypes = {
    children: PropTypes.node,
};
