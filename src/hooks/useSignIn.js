import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const payload = await mutate({
      variables: { credentials: { username, password }}
    });
    const { data } = payload;

    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    }

    return payload;
  };

  return [signIn, result];
};

export default useSignIn;