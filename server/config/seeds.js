const db = require('./connection');
const { User, Trip } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');

   const user1 = await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
  });

  const user2 = await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');
  await Trip.create([
    {
      name: 'A 3-day trip to NYC',
      destination: 'New York City',
      text: 'I had a 3-day trip to NYC with my friends. We visited museums, historical landmarks, and tried diverse cuisines. However, there are still many things that we did not have opportunities to explore. Looking forward to coming back soon!!!',
      isPublic: true,
      category: 'Urban Exploration', 
      user: user1._id, 
      createdAt: new Date(), 
      pictures: [], 
    },
    {
      name: 'Sunny Beach Vacation',
      destination: 'Miami',
      text: 'A relaxing trip to the sunny beaches of Miami. Visited the Florida Keys as well.',
      isPublic: true,
      category: 'Beach', 
      user: user2._id, 
      createdAt: new Date(), 
      pictures: [], 
    }
  ]);

  console.log('Trips seeded');

  process.exit();
});


