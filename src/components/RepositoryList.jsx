import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <Picker
          selectedValue={order}
          onValueChange={(itemValue) => setOrder(itemValue)}>
            <Picker.Item label='Latest repositories' value={'Latest repositories'} />
            <Picker.Item label='Highest rated repositories' value={'Highest rated repositories'} />
            <Picker.Item label='Lowest rated repositories' value={'Lowest rated repositories'} />
        </Picker>
      }
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('Latest repositories');
  const { repositories, refetch } = useRepositories(order);

  useEffect(() => {
    refetch();
  }, [order]);

  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder} />;
};

export default RepositoryList;