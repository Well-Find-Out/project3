const { User, Trip } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        // const user = await User.findById(context.user._id).populate({
        //   path: 'orders.products',
        //   populate: 'category',
        // });
        
        // user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    // user: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId });
    // },
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
    addTrip: async (parent, args) => {
      const trip = await Trip.create(args);

      return { trip };
    },
    addPictures: async (parent, { tripId, pictures }) => {
      return Trip.findOneAndUpdate({ _id: tripId },
        {
          $addToSet: { pictures },
        },
      );
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
