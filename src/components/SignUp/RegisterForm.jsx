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
  errorBox: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be over 5 characters')
    .max(30, 'Username must be under 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be over 5 characters')
    .max(50, 'Password must be under 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const RegisterForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: ''
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username && formik.errors.username && styles.errorBox
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          formik.touched.password&& formik.errors.password && styles.errorBox
        ]}
        placeholder='Password'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.errorBox
        ]}
        placeholder='Password confirmation'
        secureTextEntry
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        onBlur={formik.handleBlur('passwordConfirm')}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default RegisterForm;