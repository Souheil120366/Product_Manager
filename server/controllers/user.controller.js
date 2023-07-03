const User = require ('../models/user.model');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
  register: async (req, res) => {
    try {
      
        const newUser = await User.create (req.body);

        const userToken = jwt.sign (
          {_id: newUser._id, email: newUser.email},
          process.env.SECRET_KEY,{expiresIn: '30m'}
        );
        res
          .cookie ('userToken', userToken, {httpOnly: true,maxAge: 1800000})
          .status (201)
          .json (newUser);
      
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const value = err.keyValue[field];
            const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
      
            const error = {
               errors : {
                [field]: {
                  name: "ValidatorError",
                  message: message,
                  properties: {
                    message: message,
                    type: "user defined",
                    path: field,
                    value: value,
                  },
                  kind: "user defined",
                  path: field,
                  value: value,
                },
              },
              _message: "User validation failed",
              name: "ValidationError",
              message: `User validation failed: ${field}: ${message}`,
            };
      
            res.status(400).json( error);
          
          } else {
            console.log(err);
            res.status(400).json(err);
          }
    }
  },
  login: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.status(400).json({ msg: 'Invalid login attempt'});
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.status(400).json({ msg: 'Invalid login attempt'});
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("userToken", userToken, {
            httpOnly: true
        })
        .json(user);
},
  logout: (req, res) => {
    res.clearCookie('userToken');
    res.sendStatus(200);
  },
};

module.exports.getAllUsers = (request, response) => {
  User.find ({})
    .then (users => {
      console.log (users);
      response.json (users);
    })
    .catch (err => {
      console.log (err);
      response.json (err);
    });
};
module.exports.getUser = (request, response) => {
  User.findOne ({_id: request.params.id})
    .then (user => response.json (user))
    .catch (err => response.json (err));
};
module.exports.updateUser = (request, response) => {
  User.findOneAndUpdate ({_id: request.params.id}, request.body, {
    new: true,
    runValidators: true,
  })
    .then (updatedUser => response.json (updatedUser))
    .catch (err => response.status (400).json (err));
};
module.exports.deleteUser = (request, response) => {
  User.deleteOne ({_id: request.params.id})
    .then (deleteConfirmation => response.json (deleteConfirmation))
    .catch (err => response.json (err));
};
