import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ order, searchKeyword }) => {
  let variables = {};
  switch (order) {
    case 'Latest repositories':
      variables = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      };
      break;
    case 'Highest rated repositories':
      variables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC'
      };
      break;
    case 'Lowest rated repositories':
      variables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC'
      };
      break;
    default:
      break;
  };

  variables.searchKeyword = searchKeyword || '';

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  return { repositories: data?.repositories || null, loading, refetch, error };
};

export default useRepositories;