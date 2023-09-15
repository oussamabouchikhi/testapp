# 🎯 Testapp

a nestjs test backend api

## ✨ Features

- Product CRUD operations for products
- Product purchase, tracking the purchase details.
- Pagination and Search
- Aggregation for Purchase Stats
- [Random Data API](https://random-data-api.com/api/v2/credit_cards?size=100) integration
- Containerization with Docker
- JWT Authentication and Authorization
- CI/CD using Github actions

## ⬇ Installation

Make sure you have Nodejs and @nestjs/cli installed, otherwise you'll have to install them on your machine.

```bash
~ node -v
~ nest --version
```

```bash
# Clone via SSH or any other method
$ git clone git@github.com:oussamabouchikhi/testapp.git

# CD into the project
$ cd testapp

# Install the dependencies
$ yarn install
```

## 🛠️ Configuration

Rename the `example.env.development` file to `.env.development`, then edit the environment variables \
`MONGODB_URI` your MongoDB uri
`JWT_SECRET` key for hashing the cookie

```.env.development
MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_JWT_SECRET
ENCRYPT_JWT_SECRET=YOUR_JWT_ENCRIPTING_PASS
JWT_EXPIRATION=30m
```

## 🚀 Running the app

```bash
# development
$ yarn run start

# watch mode (recomended)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪 Test

```bash
# unit tests (you can add the prefix --watch)
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### 🐳 Docker

Make sure docker is running on your machine. And Obviously you installed it :)

```bash
# Build and run the container
Docker compose up
```

After running the Above command, you access the app from <http://localhost:3000/>

Other usefull commands

```bash
# Build docker images
docker-compose build

# Show docker images
docker images

# Show docker images on running container
docker ps -a
```

## API Endpoints

**NOTE**: For protected route, make sure to include the access token in the headers

```
Authorization: Bearer  YOUR_ACCESS_TOKEN
```

<details>
  <summary>Products [protected]</summary>
  
1. Create a New Product

**Endpoint:** `POST /products`

**Request Body:**

```json
{
  "name": "Product Name",
  "price": 25.99,
  "description": "Product Description"
}
```

**Response:**

```json
{
  "_id": "65030581dac2ae3cf7d58b3c",
  "name": "Product Name",
  "price": 25.99,
  "description": "Product Description"
}
```

2. Get a List of All Products

**Endpoint:** `GET /products`

**Query Parameters:**

- `page` (number): The page number.
- `itemsPerPage` (number): The number of products per page.
- `name` (string): The name of the product
- `category` (string): The category name of the product
- `price` (number): The price of the product

**Response:**

```json
[
  {
    "_id": "65030581dac2ae3cf7d58b3c",
    "name": "Product Name",
    "price": 25.99,
    "category": "Product category",
    "availability": true
  }
  // ...
]
```

3. Get a Single Product by ID

**Endpoint:** `GET /products/:id`

Response:

```json
{
  "_id": "65030581dac2ae3cf7d58b3c",
  "name": "Product Name",
  "price": 25.99,
  "category": "Product category",
  "availability": true
}
```

4. Update a Product

**Endpoint:** `PATCH /products/:id`

**Request Body:**

```json
{
  "price": 100
}
```

**Response:**

```json
{
  "_id": "65030581dac2ae3cf7d58b3c",
  "name": "Product Name",
  "price": 100,
  "category": "Product category",
  "availability": true
}
```

5. Delete a Product
   **Endpoint:** `DELETE /products/:id`

**Response:**

```json
{
  "statusCode": 200,
  "message": "Product deleted successfully."
}
```

</details>

<details>
  <summary>Purchases [protected]</summary>
  
1. Purchase a Product
**Endpoint:** `POST /purchases``

**Request Body:**

```json
{
  "userId": "65030581dac2ae3cf7d58b3b",
  "productId": "65030581dac2ae3cf7d58b3c"
}
```

**Response:**

```json
{
  "_id": "65030581dac2ae3cf7d58b3a",
  "user": {
    "_id": "65030581dac2ae3cf7d58b3b"
  },
  "product": {
    "_id": "65030581dac2ae3cf7d58b3c"
  },
  "date": "2023-09-14T13:07:13.715Z"
}
```

2. Get Purchase Statistics

**Endpoint:** `GET /purchases/stats`

**Response:**

```json
[
  {
    "_id": "65030581dac2ae3cf7d58b3c",
    "totalPurchases": 3
  },
  {
    "_id": "65030581dac2ae3cf7d58b3b",
    "totalPurchases": 2
  }
]
```

3. Get All Purchases of a User

**Endpoint:** `GET /purchases/user/:userId`

**Response:**

```json
[
  {
    "_id": "65030581dac2ae3cf7d58b3a",
    "user": {
      "_id": "65030581dac2ae3cf7d58b3b"
    },
    "product": {
      "_id": "65030581dac2ae3cf7d58b3c"
    },
    "date": "2023-09-14T13:07:13.715Z"
  }
  // ...
]
```

</details>

<details>
<summary>Authentication</summary>

1. Register a New User

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "YOUR_ACCESS_TOKEN"
}
```

2. Login a user

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "YOUR_ACCESS_TOKEN"
}
```

</details>

<details>
  <summary>Users</summary>
  
1. Update User Information

**Endpoint:** `PATCH /users/:id`

**Request Body:**

```json
{
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "_id": "65030581dac2ae3cf7d58b3b",
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "$2b$10$wGM.JMnpRw1t8m2CrIMNu.kXBr4YaaQYpSllKsiSRikS2Ei1JyT7C"
}
```

2. Delete a user

**Endpoint:** `DELETE /users/:id`

**Response:**

```json
{
  "statusCode": 200,
  "message": "User deleted successfully."
}
```

</details>

<details>
  <summary>Credit cards</summary>
  
1. Get Credit Card Stats

**Endpoint:** `GET /credit-cards/stats`

**Query Parameters:**

- `size` (string): The number of credit cards to get. \
  _Note_ that credit cards are filtered after that, so
  you may get less if they are not of type "visa"

**Response:**

```json
[
  {
    "id": 2555,
    "uid": "f484f786-fc21-44e9-9274-0ee9308c43be",
    "type": "visa",
    "number": "1212-1221-1121-1234",
    "expirationDate": "2027-09-14"
  }
  //..
]
```

</details>

### Products

### 📄 License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
