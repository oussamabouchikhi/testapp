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

### 📄 License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
