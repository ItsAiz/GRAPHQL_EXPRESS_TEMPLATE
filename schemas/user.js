const { gql } = require('graphql-tag');

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type UserResponse {
    success: Boolean!
    message: String
    user: User
  }

  type UsersResponse {
    success: Boolean!
    users: [User!]!
  }

  extend type Query {
    getUser(id: ID!): UserResponse!
    getUsers: UsersResponse!
  }
`;

module.exports = userSchema;
