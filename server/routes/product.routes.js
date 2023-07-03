const ProductController = require('../controllers/product.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    
    app.post('/api/product', authenticate, ProductController.createProduct); 
    app.get('/api/product', ProductController.getAllProducts);
    app.get('/api/product/:id', ProductController.getProduct);
    app.put('/api/product/:id', authenticate, ProductController.updateProduct);
    app.delete('/api/product/:id', authenticate,ProductController.deleteProduct);
}