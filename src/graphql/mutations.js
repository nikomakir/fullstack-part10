import { gql } from "@apollo/client";

import { USER_BASE_FIELDS } from './fragments';

export const AUTHORIZE = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        ...userBaseFields
      }
    }
  }

  ${USER_BASE_FIELDS}
`;