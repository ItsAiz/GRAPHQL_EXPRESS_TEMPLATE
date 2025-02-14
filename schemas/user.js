const { gql } = require('graphql-tag');

const userSchema = gql`
  type User {
    id: ID
    name: String!
    email: String!
  }

  extend type Query {
    getUser(id: ID!): User!
    getUsers: [User!]!
  }
`;

module.exports = userSchema;
