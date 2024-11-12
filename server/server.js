const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const {Trip} =require('./models')

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors())

const multer = require('multer');
const { TokenExpiredError } = require('jsonwebtoken');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
app.post('/upload', upload.single("image"), async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("IMAGE UPLOAD")
  console.log(req.file)
  console.log(req.body)
  console.log(req.params)
  console.log(req.query)
  const imageString = req.file.buffer.toString("base64");
  
  
  // create the image object
  const image = {
    imageString: imageString,
    name: req.body.name,
    description: req.body.description
  }
  // get the trip from the database
  await Trip.findOneAndUpdate({_id: req.query.tripId}, { $push: {pictures: image}}, {new: true});
  
  res.send({imageString})

  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
