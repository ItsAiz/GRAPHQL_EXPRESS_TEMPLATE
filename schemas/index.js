const { gql } = require("graphql-tag");

const authSchema = require("./auth");
const userSchema = require("./user");

const baseSchema = gql`
  type Query
  type Mutation
`;

module.exports = [baseSchema, userSchema, authSchema];
