import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  });
  
  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink]),
  });