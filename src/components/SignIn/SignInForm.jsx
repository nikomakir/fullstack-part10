import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from '../Text';
import { useFormik } from 'formik';
import theme from '../../theme';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 15,
    gap: 10,
  },
  buttonText: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  textInput: {
    flexGrow: 1,
    borderRadius: 5,
    borderWidth: .5,
    borderColor: 'black',
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    padding: 10,
  },
  button: {
    borderRadius: 5,
    borderWidth: .5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    padding: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm =({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' }
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' }
        ]}
        secureTextEntry
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;