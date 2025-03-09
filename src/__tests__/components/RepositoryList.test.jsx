import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.fullName, { exact: false });
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.description, { exact: false });
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.language, { exact: false });

      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.fullName, { exact: false });
      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.description, { exact: false });
      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.language, { exact: false });

      const firstItemStars = within(firstRepositoryItem).getByTestId('repositoryStars');
      const firstItemForks = within(firstRepositoryItem).getByTestId('repositoryForks');
      const firstItemReviews = within(firstRepositoryItem).getByTestId('repositoryReviews');
      const firstItemRating = within(firstRepositoryItem).getByTestId('repositoryRating');

      expect(firstItemStars).toHaveTextContent(
        (repositories.edges[0].node.stargazersCount / 1000).toFixed(1) + 'kStars'
      );
      expect(firstItemForks).toHaveTextContent(
        (repositories.edges[0].node.forksCount / 1000).toFixed(1) + 'kForks'
      );
      expect(firstItemReviews).toHaveTextContent(
        repositories.edges[0].node.reviewCount.toString() + 'Reviews'
      );
      expect(firstItemRating).toHaveTextContent(
        repositories.edges[0].node.ratingAverage.toString() + 'Rating'
      );

      const secondItemStars = within(secondRepositoryItem).getByTestId('repositoryStars');
      const secondItemForks = within(secondRepositoryItem).getByTestId('repositoryForks');
      const secondItemReviews = within(secondRepositoryItem).getByTestId('repositoryReviews');
      const secondItemRating = within(secondRepositoryItem).getByTestId('repositoryRating');

      expect(secondItemStars).toHaveTextContent(
        (repositories.edges[1].node.stargazersCount / 1000).toFixed(1) + 'kStars'
      );
      expect(secondItemForks).toHaveTextContent(
        repositories.edges[1].node.forksCount.toString() + 'Forks'
      );
      expect(secondItemReviews).toHaveTextContent(
        repositories.edges[1].node.reviewCount.toString() + 'Reviews'
      );
      expect(secondItemRating).toHaveTextContent(
        repositories.edges[1].node.ratingAverage.toString() + 'Rating'
      );
    });
  });
});