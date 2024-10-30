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
    details: String
    public: Boolean
    createdAt: String
    pictures: [Picture]
    user: User
  }

  input TripData {
    name: String
    destination: String
    details: String
    public: Boolean    
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

  type Query {
    user(userId: ID!): User
    # user: User
    users: [User]
    trip(tripId: ID!): Trip
    trips: [Trip]
    pictures: [Trip]    
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addTrip(trip: TripData!): Trip
    addPicture(tripId: ID!, trip: TripPicture!): Trip
    updateTrip(tripId: ID!, name: String!, destination: String!, details: String): Trip
    deleteTrip(tripId: ID!): Trip
  }
`;

module.exports = typeDefs;
