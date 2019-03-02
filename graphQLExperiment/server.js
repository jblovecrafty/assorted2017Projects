// From tutorial (with changes) 
// https://scotch.io/tutorials/a-practical-graphql-getting-started-guide-with-nodejs

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

// Init GraphQL Schema
const schema = buildSchema(
    `type Query{
        user(id: Int!): Person
        users(gender: String): [Person]
    },
    type Mutation {
        updateUser(id: Int!, name: String!, age: Int!): Person
    }
    type Person {
        id: Int
        name: String
        age: Int
        gender: String
    }`
);

let users = [
    {
        id: 1,
        name: 'Pantalaimon',
        age: 10,
        gender: 'M'
    },
    {
        id: 2,
        name: 'Eowyn',
        age: 2,
        gender: 'F'
    },
    {
        id: 3,
        name: 'Sundance',
        age: 17,
        gender: 'F'
    }
];

const getUser = args => {
    return users.filter(user => user.id == args.id)[0];
}

const retrieveUsers = args => {
    if(args.gender) {
        return users.filter(user => user.gender == args.gender);
    }
    else {
        return users;
    }
}

const updateUser = ({id, name, age}) => {
    users.map(user => {
        if(user.id == id) {
            user.name = name;
            user.age = age;

            return user;
        }
    });

    return users.filter(user => user.id == id)[0];
}

// Resolve Root Operations
const root = {
    user: getUser,
    users: retrieveUsers,
    updateUser: updateUser
};

// Build express server and GraphQL endpoint
const app =  express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Enable GraphiQL when server endpoint is accessed via browser
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

// Sample Queries
/*query getSingleUser($userId: Int!){
    user(id: $userId) {
      name
      age
      gender
    }
  }

  query getUsersWithAlias($userAId: Int!, $userBId: Int!){
  userA: user(id: $userAId){
    name
    age
    gender
  },
  userB: user(id: $userBId){
    name
    age
    gender
  }
}

query getUsersWithFragments($userAId: Int!, $userBId: Int!){
  userA: user(id: $userAId){
    ...userFields
  },
  userB: user(id: $userBId){
    ...userFields
  }
}

fragment userFields on Person {
  name
  age
  gender
}

mutation updateUser($id: Int!, $name: String!, $age: Int!){
  updateUser(id: $id, name: $name, age: $age) {
    ...userFields
  }
}

{
  "name": "Fat Cat",
  "age": 11,
  "id": 1
}
  */
