import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      userName
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

export const QUERY_TRIPS = gql`
query trips {
  trips {
    _id
    name
    destination
    text
    isPublic
    thumbnail
    category
    createdAt
    user {
      _id
    }
  }
}
`;

export const QUERY_CATEGORY = gql`
query categoryList {
  categoryList {
    category
  }
}
`;

export const QUERY_TRIPS_BY_CATEGORY = gql`
query tripsByCategory($category: String) {
  tripsByCategory(category: $category) {
    _id
    name
    destination
    isPublic
    thumbnail
    category
    createdAt
    user {
      _id
    }
  }
}
`;

export const QUERY_TRIP = gql`
  query Trip($tripId: ID!) {
  trip(tripId: $tripId) {
    _id
    name
    destination
    text
    isPublic
    thumbnail
    category
    createdAt
    canEdit
    user {
      _id
      userName
    }
  }
}
`;

export const QUERY_RECENT_TRIPS = gql`
query recentTrips {
  recentTrips {
    _id
    name
    thumbnail
  }
}
`;

export const QUERY_USER_TRIPS = gql`
query UserTrips {
  userTrips {
    _id
    name
    destination
    isPublic
    category
    createdAt    
    text
    thumbnail
    user {
      _id
    }
  }
}
`;

export const QUERY_PICTURES = gql`
query picturesTrip($tripId: ID!) {
  picturesTrip(tripId: $tripId) {
    pictures {
      name
      description
      imageString
    }
  }
}
`;

