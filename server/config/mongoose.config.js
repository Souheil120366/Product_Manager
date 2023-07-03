const mongoose = require('mongoose');
//This will create a database named "product" if one doesn't already exist (no need for mongo shell!):
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));