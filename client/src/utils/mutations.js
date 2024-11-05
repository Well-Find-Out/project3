import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip($trip: TripData!) {
    addTrip(trip: $trip) {
      _id
      createdAt
      destination
      text
      name
      isPublic
      user {
        _id
      }
    }
}
`;

export const UPDATE_TRIP = gql`
  mutation updateTrip(
  $tripId: ID!, 
  $name: String!, 
  $destination: String!, 
  $text: String
  $isPublic: Boolean) {
  updateTrip(tripId: $tripId, name: $name, destination: $destination, text: $text, isPublic: $isPublic) {
    _id
  }
}
`;

export const DELETE_TRIP = gql`
  mutation deleteTrip($tripId: ID!) {
    deleteTrip(tripId: $tripId) {
    _id
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation uploadPicture($tripId: ID!, $trip: TripPicture!) {
  uploadPicture(tripId: $tripId, trip: $trip) {
    _id
  }
}
`;

