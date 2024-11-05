const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    trips: [Trip]
  }

  type Trip {
    _id: ID
    name: String
    destination: String
    text: String
    isPublic: Boolean
    thumbnail: String
    category: String
    createdAt: String
    pictures: [Picture]
    user: User
  }

  input TripData {
    name: String
    destination: String
    text: String
    isPublic: Boolean
    thumbnail: String
    category: String     
  }

  type Picture {
    url: String
    description: String
  }

  input TripPicture {
    url: String
    description: String   
  }

  type Auth {
    token: ID
    user: User
  }

  enum SortingOrder {
    ASC
    DESC
    ASC_NULLS_LAST
    DESC_NULLS_FIRS
  }

  input OrderData {
    createdAt: SortingOrder
  }

  type Query {
    user(userId: ID!): User
    users: [User]
    trip(tripId: ID!): Trip
    # recentTrips(): [Trip]
    userTrips(userId: ID!): [Trip]
    trips: [Trip]
    pictures: [Trip]    
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addTrip(trip: TripData!): Trip    
    updateTrip(tripId: ID!, name: String!, destination: String!, text: String!, isPublic: Boolean!, thumbnail: String, category: String!): Trip
    deleteTrip(tripId: ID!): Trip
    uploadPicture(tripId: ID!, trip: TripPicture!): Trip
  }
`;

module.exports = typeDefs;
