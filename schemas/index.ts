import gql from 'graphql-tag';
import authSchema from './auth';
import userSchema from './user';

const baseSchema = gql`
  type Query
  type Mutation
`;

export default [baseSchema, userSchema, authSchema];
