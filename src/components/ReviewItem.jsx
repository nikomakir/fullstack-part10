import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  ratingContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  reviewContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
  },
  reviewItem : {
    flexGrow: 1,
    paddingLeft: 8,
  },
  reviewCreated: {
    paddingTop: 2,
    color: theme.colors.textSecondary,
  },
  reviewText: {
    paddingTop: 5,
    paddingRight: 20,
  },
  ratingText: {
    textAlign: 'center',
    paddingTop: 8,
  }
});

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingContainer}>
      <Text color="primary" fontWeight="bold" style={styles.ratingText}>
        {review.rating}
      </Text>
    </View>
    <View style={styles.reviewItem}>
      <Text fontWeight="bold">
        {review.user ? review.user.username : review.repository.fullName}
      </Text>
      <Text style={styles.reviewCreated}>
        {format(review.createdAt, 'dd.MM.yyyy')}
      </Text>
      {review.text && (
        <Text style={styles.reviewText}>
        {review.text}
        </Text>
      )}
    </View>
  </View>
);

export default ReviewItem;