import React from "react";
import { PropTypes } from "../../lib";


import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
});

export const GraphQLProvider = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);

GraphQLProvider.propTypes = {
    children: PropTypes.elements
};
