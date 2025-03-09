import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View } from 'react-native';
import Text from './Text';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY,
    { variables: { repositoryId }}
  );

  if (loading) {
    return <View><Text>Loading...</Text></View>
  };

  return <RepositoryItem repository={data?.repository} single />;
};

export default SingleRepository;