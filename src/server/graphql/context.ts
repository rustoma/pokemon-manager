import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import type { NextRequest } from 'next/server';

export const buildContext = async (req: NextRequest) => {
  const tokenHeader = req.headers.get('authorization') ?? '';
  const token = tokenHeader.replace(/^bearer\s+/i, '');

  try {
    if (token) {
      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new GraphQLError('JWT_SECRET is not set');
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      return { user: decoded as unknown };
    }
  } catch {
    return { user: null };
  }
  return { user: null };
};
