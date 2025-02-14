const { gql } = require('graphql-tag');

const authSchema = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    data: AuthPayload
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthResponse!
    register(name: String!, email: String!, password: String!): AuthResponse!
  }
`;

module.exports = authSchema;
