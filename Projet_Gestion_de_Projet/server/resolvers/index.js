const { projetsResolvers } = require('./projetsResolvers');
const { tachesResolvers } = require('./tachesResolvers');
const { developpeursResolvers } = require('./developpeursResolvers');
const { reunionsResolvers } = require('./reunionsResolvers');

const resolvers = [projetsResolvers, tachesResolvers, developpeursResolvers ,reunionsResolvers];

module.exports = {
    resolvers
}