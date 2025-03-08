import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  text: {
    color: 'white',
    padding: 15,
  },
});

const AppBar = () => {
  const [signOut, query] = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text fontSize="subHeading" style={styles.text}>
            Repositories
          </Text>
        </Link>
        {!query.loading && query.data.me ?
        (<Pressable onPress={signOut}>
          <Text fontSize="subHeading" style={styles.text}>
            Sign out
          </Text>
        </Pressable>) :
        (<Link to="/signin">
          <Text fontSize="subHeading" style={styles.text}>
            Sign in
          </Text>
        </Link>)}
      </ScrollView>
    </View>
  );
};

export default AppBar;