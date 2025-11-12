import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import bcrypt from 'bcrypt';
import { gql } from 'graphql-tag';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import prisma from '@/lib/prisma';

import type { NextRequest } from 'next/server';

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    signup(email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: (_: unknown, __: unknown, context: { user: { email: string } | null }) => {
      if (!context.user) {
        throw new Error('Not authenticated');
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
        throw new Error('User with this email already exists');
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

      if (JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
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
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    },
  },
};

const context = async (req: NextRequest) => {
  const token = req.headers.get('authorization') ?? '';

  try {
    if (token) {
      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      return { user: decoded };
    }
  } catch {
    return { user: null };
  }
  return { user: null };
};

const apolloServer = new ApolloServer<{ user?: { email: string } }>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, { context });

export { handler as GET, handler as POST };
