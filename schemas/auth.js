const { gql } = require("graphql-tag");

const authSchema = gql`
  type AuthPayload {
    token: String
    user: User
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!): AuthPayload!
  }
`;

module.exports = authSchema;
