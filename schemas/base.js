const { gql } = require("graphql-tag");

const baseSchema = gql`
  type Query {
    me: User
    getUser(id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!): AuthPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = baseSchema;
