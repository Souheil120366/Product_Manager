const ProductController = require('../controllers/product.controller');
module.exports = (app) => {
    
    app.post('/api/product', ProductController.createProduct); 
    app.get('/api/product', ProductController.getAllProducts);
    app.get('/api/product/:id', ProductController.getProduct);
}