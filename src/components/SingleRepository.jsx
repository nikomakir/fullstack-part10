import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import ReviewItem from './ReviewItem';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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