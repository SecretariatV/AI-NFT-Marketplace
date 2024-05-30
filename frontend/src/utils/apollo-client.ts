import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/61092/zero/0.0.0",
  cache: new InMemoryCache(),
});

export default client;
