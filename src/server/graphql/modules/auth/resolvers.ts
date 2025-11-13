import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import prisma from '@/lib/prisma';

const resolvers = {
  Query: {
    hello: (_: unknown, __: unknown, context: { user: { email: string } | null }) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }
      return `Hello, ${context.user.email}`;
    },
  },
  Mutation: {
    signup: async (_: unknown, { email, password }: { email: string; password: string }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new GraphQLError('User with this email already exists');
      }

      const SALT_ROUNDS = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new GraphQLError('JWT_SECRET is not set');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    },
    login: async (_: unknown, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new GraphQLError('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new GraphQLError('Invalid credentials');
      }

      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new GraphQLError('JWT_SECRET is not set');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    },
  },
};

export default resolvers;
