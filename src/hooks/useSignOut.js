import { useApolloClient, useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from '../graphql/queries';
import { useNavigate } from "react-router-native";

import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const query = useQuery(GET_CURRENT_USER);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return [signOut, query];
};

export default useSignOut;