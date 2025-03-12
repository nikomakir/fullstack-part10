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
  ownerName: yup
    .string()
    .required('Repository owner is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup.number()
    .min(0, 'Rating must be at leas 0')
    .max(100, 'Rating can be max 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: null,
      text: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.ownerName && formik.errors.ownerName && styles.errorBox
        ]}
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput 
        style={[
          styles.textInput,
          formik.touched.repositoryName && formik.errors.repositoryName && styles.errorBox
        ]}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput 
        style={[
          styles.textInput,
          formik.touched.rating && formik.errors.rating && styles.errorBox
        ]}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating ? String(formik.values.rating) : ''}
        onChangeText={(value) => formik.setFieldValue('rating', Number(value))}
        onBlur={formik.handleBlur('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput 
        style={styles.textInput}
        placeholder='Review'
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
      />
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>
            Create a review
          </Text>
        </Pressable>
    </View>
  );
};

export default ReviewForm;