// set variables for app

if (process.env.NODE_ENV === 'local') {
    require('dotenv').config();
}
const app = require('express')();
const { graphqlExpress } = require('apollo-server-express');

const cors = require('cors');

const bodyParser = require('body-parser');
const Playground = require('graphql-playground-middleware-express').default;

const { server } = require('./config');
const schema = require('./schema');
const { healthCheck, auth } = require('./lib')

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send({ message: 'This as an CRM Backend application.' });
});

app.get('/healthz/liveness', healthCheck.liveness);
app.get('/healthz/readiness', healthCheck.readiness);

const buildOptions = async (req, res) => {
    const token = req.headers.Authorizarion || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3ODYsImVtYWlsIjoiaGVtYW50Lmt1bWFyQGFzZXJnaXMuaW4iLCJuYW1lIjoiSGVtYW50Iiwicm9sZSI6IjIifSwiaWF0IjoxNTA0NzY1NDAzLCJleHAiOjE1MDQ4NTE4MDN9.G-LD2WR9rjxtQzs9DpO9IR0awM4bLMmGDUp6LOvE4S0';
    const user = auth.getUserFromToken(token);
    return {
        context: { user },
        schema
    }
}

app.use('/graphiql', Playground({ endpoint: '/graphql' }));

app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

app.listen(server.port, () => {
    console.log('info', `Running a GraphQL API server at http://${server.host}:${server.port}/graphiql`);
});