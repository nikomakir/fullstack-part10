import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          reviewCount
          ratingAverage
          stargazersCount
        }
      }
    }
  }
`;