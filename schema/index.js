
const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const path = require('path');

const arrTypeDefs = fileLoader(path.join(__dirname, './typeDefs'), { extensions: ['.js'] });
const typeDefs = mergeTypes(arrTypeDefs);

const resolversArray = fileLoader(path.join(__dirname, './resolvers'), { extensions: ['.js'] });
const resolvers = mergeResolvers(resolversArray);

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});
