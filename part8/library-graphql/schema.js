const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String, author: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
