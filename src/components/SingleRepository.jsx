import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
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

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingContainer}>
      <Text color="primary" fontWeight="bold" style={styles.ratingText}>
        {review.rating}
      </Text>
    </View>
    <View style={styles.reviewItem}>
      <Text fontWeight="bold">
        {review.user.username}
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

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
      variables: { repositoryId },
      fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;

  const reviewEdges = data.repository
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewEdges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={data?.repository} single />}
    />
  );
};

export default SingleRepository;