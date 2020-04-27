const { projetType, tacheType, developpeurType } = require('./types');
const { query } = require('./query');
const { mutation } = require('./mutation');

const typeDefs = [mutation, query, projetType, tacheType, developpeurType];

module.exports = {
    typeDefs
}