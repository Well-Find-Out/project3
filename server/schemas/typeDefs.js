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
    createdAt: String
    pictures: [Pictures]
  }

  type Pictures {
    _id: ID
    fileName: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    user(userId: ID!): User   
    trip(tripId: ID!): Trip
    trips: [Trip]
    pictures: [Trip]    
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addTrip(name: String!, destination: String!, details: String): Trip
    addPictures(tripId: ID!, fileName: String): Trip
    # updateTrip(tripId: ID!, name: String!, destination: String!, details: String): Trip
    deleteTrip(tripId: ID!): Trip
  }
`;

module.exports = typeDefs;
