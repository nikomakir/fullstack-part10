import { View, StyleSheet, Image, Pressable } from "react-native";
import RepositoryStats from "./RepositoryStats";
import RepositoryInfo from "./RepositoryInfo";
import Text from "../Text";
import theme from "../../theme";
import { openURL } from "expo-linking";

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'left',
    paddingTop: 10,
  },
  flexItemImage: {
    flexGrow: 0,
    padding: 15,
  },
  flexItemInfo: {
    flexGrow: 1,
    padding: 15,
  },
  ownerLogo: {
    width: 50,
    height: 50,
  },
  backGround: {
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 7,
    borderWidth: .5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  flexItemButton: {
    padding: 15,
  },
});

const RepositoryItem = ({ repository, single }) => (
  <View style={styles.backGround} testID="repositoryItem">
    <View style={styles.flexContainer}>
      <View style={styles.flexItemImage}>
        <Image
          style={styles.ownerLogo}
          source={{ uri: repository.ownerAvatarUrl }}
        />
      </View>
      <View style={styles.flexItemInfo}>
        <RepositoryInfo
          name={repository.fullName}
          descpription={repository.description}
          language={repository.language}
        />
      </View>
    </View>
    <RepositoryStats
        stars={repository.stargazersCount}
        forks={repository.forksCount}
        reviews={repository.reviewCount}
        rating={repository.ratingAverage}
      />
    {single && (
      <View style={styles.flexItemButton}>
        <Pressable style={styles.button} onPress={() => openURL(repository.url)}>
          <Text style={styles.buttonText}>
            Open in GitHub
          </Text>
        </Pressable>
      </View>
    )}
  </View>
);

export default RepositoryItem;