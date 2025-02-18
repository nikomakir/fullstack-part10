import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  text: {
    color: 'white',
  },
});

const AppBar = () => {
  return <View style={styles.container}>{
      <Pressable>
        <Text fontSize="subHeading" style={styles.text}>
          Repositories
        </Text>
      </Pressable>}
    </View>;
};

export default AppBar;