const Product = require('../models/product.model');   

module.exports.createProduct = (request, response) => {
    
    Product.create(request.body) //This will use whatever the body of the client's request sends over
        .then(product => response.json(product))
        .catch(err => response.json(err));
}