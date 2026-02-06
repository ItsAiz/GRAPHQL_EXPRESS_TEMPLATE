import gql from 'graphql-tag';

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type UserData {
    user: User
  }

  type UsersData {
    users: [User]
  }

  type UserResponse {
    success: Boolean!
    message: String!
    data: UserData
  }

  type UsersResponse {
    success: Boolean!
    message: String!
    data: UsersData
  }

  extend type Query {
    getUser(id: ID!): UserResponse!
    getUsers: UsersResponse!
  }
`;

export default userSchema;
