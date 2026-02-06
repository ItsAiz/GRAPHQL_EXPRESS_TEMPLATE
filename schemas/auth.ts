import gql from 'graphql-tag';

const authSchema = gql`
  type AuthPayload {
    token: String
    routes: [String!]
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

export default authSchema;
