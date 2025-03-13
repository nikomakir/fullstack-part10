import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listHeaderComponent: {
    padding: 15,
  },
  searchBar: {
    backgroundColor: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ navigate, repositories, order, setOrder, search, setSearch }) => {
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
        <View style={styles.listHeaderComponent}>
          <Searchbar style={styles.searchBar} placeholder='Search' onChangeText={setSearch} value={search} />
          <Picker
            selectedValue={order}
            onValueChange={(itemValue) => setOrder(itemValue)}>
              <Picker.Item label='Latest repositories' value={'Latest repositories'} />
              <Picker.Item label='Highest rated repositories' value={'Highest rated repositories'} />
              <Picker.Item label='Lowest rated repositories' value={'Lowest rated repositories'} />
          </Picker>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState('Latest repositories');
  const [search, setSearch] = useState('');
  const [searchKeyword] = useDebounce(search, 500);
  const { repositories, refetch } = useRepositories({ order, searchKeyword });

  useEffect(() => {
    refetch();
  }, [order, searchKeyword]);

  return (
    <RepositoryListContainer
      navigate={navigate}
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default RepositoryList;