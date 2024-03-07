const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } = require('graphql');
const { sshTunnelConfig, dbServer } = require('./../config');
const createSshTunnel = require('./../sshTunnel');
const queryDatabase = require('./../databasequery');
const cors = require('cors'); // Import the cors package

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    // Define other fields as needed
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    students: {
      type: new GraphQLList(StudentType),
      resolve: async () => {
        try {
          const stream = await createSshTunnel(sshTunnelConfig, dbServer);
          const sqlQuery = 'SELECT * FROM student_members';
          const results = await queryDatabase(sqlQuery, stream);
          return results;
        } catch (error) {
          throw new Error('Error fetching data from database: ' + error.message);
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

const app = express();
const PORT = 4500;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Enable GraphiQL for easy testing via browser
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
