import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from '../graphql/queries';

import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const query = useQuery(ME);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return [signOut, query];
};

export default useSignOut;