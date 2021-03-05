# wolfpack-digital-flower-shop
This is a repository which holds Wolfpack Digital Flower Shop REST APIs.

* [Usage](#usage)
* [Technologies](#technologies)
* [Setup](#setup)

## Usage
Project supports request to the following APIs:
- GET ​/api​/v1​/orders - Retrieves a list of orders
- POST ​/api​/v1​/orders - Create an order
- PUT ​/api​/v1​/orders​/{orderId} - Update an order
- GET ​/api​/v1​/products - Retrieves a list of products
- POST ​/api​/v1​/products - Create a product
- PUT ​/api​/v1​/products/{productId} - Update a product
- DELETE ​/api​/v1​/products/{productId} - Delete a product
- GET ​/api​/v1​/recommendations - Retrieves a list of flower recommendations

Full documentation can be found [here][api-docs]


## Technologies
Project is created with:
- node: v12.18.2

## Setup
In order to start this project you must have a valid mongoDB connection string.
Once you have it, create a .env file and store it in DB_URI variable.

To run this project:
* download and install
* run the npm:
```
$ cd ../wolfpack-digital-flower-shop
$ npm install
$ npm start
```

[api-docs]: https://app.swaggerhub.com/apis-docs/GabrielaLucan/FlowerStore/1.0.0
