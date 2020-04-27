const { projetsResolvers } = require('./projetsResolvers');
const { tachesResolvers } = require('./tachesResolvers');
const { developpeursResolvers } = require('./developpeursResolvers');

const resolvers = [projetsResolvers, tachesResolvers, developpeursResolvers];

module.exports = {
    resolvers
}