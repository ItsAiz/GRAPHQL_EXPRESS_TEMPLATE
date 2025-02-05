const { gql } = require("graphql-tag");

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  extend type Query {
    me: User
    getUser(id: ID!): User
  }
`;

module.exports = userSchema;
