import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  flexItem: {
    flexGrow: 1,
    padding: 4,
  },
  flexItemLanguage: {
    flexGrow: 1,
    padding: 4,
    borderRadius: 5,
    borderWidth: .5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  languageIcon: {
    backgroundColor: theme.colors.primary,
    color: 'white',
  },
});

const RepositoryInfo = ({ name, descpription, language }) => (
  <View style={styles.flexContainer}>
    <View style={styles.flexItem}>
      <Text fontWeight='bold'>{name}</Text>
    </View>
    <View style={styles.flexItem}>
      <Text>{descpription}</Text>
    </View>
    <View style={styles.flexItemLanguage}>
      <Text style={styles.languageIcon}>{language}</Text>
    </View>
  </View>
);

export default RepositoryInfo;