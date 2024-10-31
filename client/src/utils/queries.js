import { gql } from '@apollo/client';

export const QUERY_TRIPS = gql`
  {
    trips {
      _id
      name
      destination
      createdAt
      details
      public
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
        _id
        firstName
        lastName
        email
    }
}
`;
