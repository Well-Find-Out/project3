const { User, Trip, Image } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id); 
        console.log(user);
        return user;
      }
      throw AuthenticationError;
    },
    users: async (parent, args) => {
      return await User.find({}).select('-__v');
    },
    trip: async (parent, { tripId }, context) => {
      if (context.user) { 
        const trip = await Trip.findById({ _id: tripId }).populate('user').select('-__v');
      return { ...trip.toJSON(), createdAt: trip.createdAt, canEdit: context?.user?._id == trip.user._id };
      } else {
        return await Trip.findById({ _id: tripId }).select('-__v');
      }      
    },
    trips: async (parent, args) => {
        return await Trip.find({}).select('-__v');
    },
    recentTrips: async (parent, args) => {
      return await Trip.find({isPublic: true}).sort({createdAt: -1}).limit(5).select('-__v');
    },
    userTrips: async (parent, args, context) => {
      if (context.user) {
        const userId = context.user._id;
        return await Trip.find({ user: userId }).sort({ createdAt: -1 }).select('-__v');
      }
    },
    tripsByCategory: async (parent, {category}) => {      
      const trips = await Trip.find({category: category, isPublic: true}).sort({createdAt: -1}).select('-__v');
      return trips;
    },
    categoryList: async (parent, args) => {      
      return (await Trip.find().populate('category').select('-__v'));      
    },
    picturesTrip: async (parent, { tripId }, context) => {
      if (context.user) {
        return await Trip.findById({ _id: tripId }).select('-__v');
      }
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

    deleteTrip: async (parent, {tripId}, context) => {
      if (context.user) {          
        return await Trip.findOneAndDelete({ _id: tripId });
      }
      throw AuthenticationError;     
    },

    updateTrip: async (parent, args, context) => {  
      if (context.user) { 
        const tripId = args.tripId;
        return await Trip.findByIdAndUpdate(
          { _id: tripId },
          args,
          { new: true, })
          .select('-__v');
      }      
      throw AuthenticationError; 
    },

    uploadPicture: async (parent, args, context) => {  
      if (context.user) { 
        const tripId = args.tripId;
        return await Trip.findByIdAndUpdate(
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
