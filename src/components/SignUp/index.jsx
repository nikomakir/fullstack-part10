import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import useSignIn from "../../hooks/useSignIn";
import { SIGN_UP } from "../../graphql/mutations";

import RegisterForm from "./RegisterForm";

const SignUp = () => {
  const [mutate] = useMutation(SIGN_UP);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      const { username, password } = values;

      const { data } = await mutate({ variables: {
        user: {
          username,
          password
        },
      }});

      if (!data || !data.createUser) {
        throw new Error('Failed to sign up');
      };

      await signIn({ username, password });
      navigate('/', { replace: true });
    } catch (error) {
      console.log('Error signing up:', error.message);
    };
  };

  return <RegisterForm onSubmit={onSubmit} />;
};

export default SignUp;