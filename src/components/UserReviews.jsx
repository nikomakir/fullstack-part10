import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
     data={reviewNodes}
     ItemSeparatorComponent={ItemSeparator}
     renderItem={({ item }) => <ReviewItem review={item} />}
     keyExtractor={item => item.id}
    />
  );
};

export default UserReviews;