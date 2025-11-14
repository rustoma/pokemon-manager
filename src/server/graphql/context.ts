import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import type { NextRequest } from 'next/server';

export type GraphQLContext = {
  user: { id: string } | null;
};

export const buildContext = async (req: NextRequest): Promise<GraphQLContext> => {
  const tokenHeader = req.headers.get('authorization') ?? '';
  const token = tokenHeader.replace(/^bearer\s+/i, '');

  try {
    if (token) {
      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new GraphQLError('JWT_SECRET is not set');
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded && typeof decoded.userId === 'string') {
        return { user: { id: decoded.userId } };
      }
    }
  } catch {
    return { user: null };
  }
  return { user: null };
};
