import { View, StyleSheet, Image } from "react-native";
import RepositoryStats from "./RepositoryStats";
import RepositoryInfo from "./RepositoryInfo";


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
  }
});

const RepositoryItem = ({ repository }) => (
  <View style={styles.backGround}>
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
  </View>
);

export default RepositoryItem;