import React from "react";
import { PropTypes } from "../../lib";
import { BrowserRouter as Router } from 'react-router-dom'

export const RouterProvider = ({ children }) => (
    <Router>{children}</Router>
);

RouterProvider.propTypes = {
    children: PropTypes.elements
};
