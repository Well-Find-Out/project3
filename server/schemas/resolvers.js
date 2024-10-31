const { User, Trip } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);        
        return user;
      }
      throw AuthenticationError;
    },
    users: async (parent, args) => {
        return User.find({}).select('-__v');
    },
    trip: async (parent, { tripId }) => {
      return Trip.findOne({ _id: tripId });
    },
    trips: async (parent, args) => {
        return Trip.find({}).select('-__v');
    },
    pictures: async (parent, args) => {
        return Trip.find({}).populate({ path: 'pictures', select: '-__v' });
    },
  },
  Mutation: {
    addTrip: async (parent, args, context) => {
      if (context.user) {    
        const user = await User.findById(context.user._id);
        const trip = await Trip.create({ ...args.trip, user: context.user._id });
        user.trips.push(trip);
        user.save();
        return trip.populate("user");
      }
      throw AuthenticationError;     
    },
    
    addPicture: async (parent, args, context) => {  
      if (context.user) { 
        const tripId = args.tripId;
        return Trip.findByIdAndUpdate(
          { _id: tripId },
          { $push: { pictures: args.trip } },     
          ).select('-__v');
          }
      throw AuthenticationError; 
    },


    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
