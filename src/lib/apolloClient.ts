import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

import { API_ROUTES } from '@/client/consts/apiRoutes';

const getGraphQLUri = () => {
  if (globalThis.window === undefined) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return `${baseUrl}${API_ROUTES.GRAPHQL}`;
  }

  return API_ROUTES.GRAPHQL;
};

const httpLink = new HttpLink({
  uri: getGraphQLUri(),
  fetch,
});

const authLink = new SetContextLink((prevContext) => {
  let token: string | null = null;
  if (globalThis.window !== undefined) {
    token = localStorage.getItem('token');
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  ssrMode: globalThis.window === undefined,
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
