import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
  },
  flexItem: {
    flexGrow: 1,
  },
});

const RepositoryStats = ({ stars, forks, reviews, rating }) => {
  const starsText = stars < 1000
    ? stars
    : (stars / 1000).toFixed(1) + 'k';
  
  const forksText = forks < 1000
    ? forks
    : (forks / 1000).toFixed(1) + 'k';
  
  const reviewsText = reviews < 1000
    ? reviews
    : (reviews / 1000).toFixed(1) + 'k';

  const ratingText = rating < 1000
    ? rating
    : (rating / 1000).toFixed(1) + 'k';

  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItem}>
        <Text fontWeight='bold'>{starsText}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.flexItem}>
        <Text fontWeight='bold'>{forksText}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.flexItem}>
        <Text fontWeight='bold'>{reviewsText}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.flexItem}>
        <Text fontWeight='bold'>{ratingText}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;