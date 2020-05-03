const { projetType, tacheType, developpeurType,reunionType } = require('./types');
const { query } = require('./query');
const { mutation } = require('./mutation');

const typeDefs = [mutation, query, projetType, tacheType, developpeurType,reunionType];

module.exports = {
    typeDefs
}