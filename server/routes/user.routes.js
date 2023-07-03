const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/logout', UserController.logout); 
    app.post('/api/users/login', UserController.login); 
    app.get('/api/users',authenticate,UserController.getAllUsers);

    // app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getUser);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
}