import authResolvers from './auth';
import userResolvers from './user';

const resolvers = {
  Query: {
    ...(userResolvers.Query || {}),
  },
  Mutation: {
    ...(authResolvers.Mutation || {}),
  },
};

export default resolvers;
