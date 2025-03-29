'use client';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { Loader2 } from 'lucide-react';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (!GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
}

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const LOGIN_MUTATION = gql`
  mutation {
    login(
      email: "${process.env.NEXT_PUBLIC_AUTH_EMAIL}"
      password: "${process.env.NEXT_PUBLIC_AUTH_PASSWORD}"
    ) {
      token
    }
  }
`;

export function GraphQlProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const initialClient = new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        });

        const { data } = await initialClient.mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            email: process.env.NEXT_PUBLIC_AUTH_EMAIL,
            password: process.env.NEXT_PUBLIC_AUTH_PASSWORD,
          },
        });

        const token = data?.login?.token;
        if (!token) {
          throw new Error('Authentication failed: No token received');
        }

        const authLink = setContext((_, { headers }) => ({
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        }));

        const authenticatedClient = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        });

        setClient(authenticatedClient);
      } catch (err) {
        console.error('GraphQL client initialization error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    initializeClient();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen text-red-500'>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className='flex items-center justify-center min-h-screen text-red-500'>
        <p>Failed to initialize GraphQL client</p>
      </div>
    );
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
