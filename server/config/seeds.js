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
      name:'A 3-day trip to NYC',
      destination: 'New York City',
      date:'2024-01-01',
      details:'I had a 3-day trip to NYC with my friends. We visited museums, and historical landmarks, and had tried diverse cuisines. However, there are still many things that we did not have opporutnities to explore. Looking forward to coming back soon!!!',
      public: true,
      userId: user1._id,
    },
    {
      name: 'Sunny Beach Vacation',
        destination: 'Miami',
        date: '2023-1-15',
        details: 'A relaxing trip to the sunny beaches of Miami. Visited West Key as well.',
        public: true,
        userId: user2._id,
    }
  
  ]);
  console.log('Trips seeded');

  process.exit();
});


