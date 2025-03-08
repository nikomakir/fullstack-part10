import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

import SignInForm from './SignInForm';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    };
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;