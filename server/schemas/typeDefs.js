const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
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

  type TripDetails {
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
    canEdit: Boolean
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
    imageString: String
    name: String
    description: String
  }

  input TripPicture {
    imageString: String
    name: String
    description: String  
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(userId: ID!): User
    users: [User]
    trip(tripId: ID!): TripDetails
    recentTrips: [Trip]    
    userTrips: [Trip]
    trips: [Trip]
    categoryList: [Trip] 
    tripsByCategory(category: String!): [Trip]
    picturesTrip(tripId: ID!): Trip
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, userName: String!, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addTrip(trip: TripData!): Trip    
    updateTrip(tripId: ID!, name: String!, destination: String!, text: String!, isPublic: Boolean!, thumbnail: String, category: String!): Trip
    deleteTrip(tripId: ID!): Trip
    uploadPicture(tripId: ID!, imageString: String!, name: String, description: String): Trip
  }
`;

module.exports = typeDefs;
