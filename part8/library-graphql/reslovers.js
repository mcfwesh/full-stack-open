const { UserInputError, AuthenticationError } = require("apollo-server");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        const books = async (filter1, filter2) => {
          return await Book.find(filter1)
            .populate({
              path: "author",
              match: filter2,
            })
            .exec();
        };
        if (args.author && args.genre) {
          const filter1 = { genres: { $in: [args.genre] } };
          const filter2 = { name: args.author };
          const response = await books(filter1, filter2);
          return response.filter((book) => book.author);
        }
        if (args.genre) {
          const filter = { genres: { $in: [args.genre] } };
          return (await books(filter)).filter((book) => book.author);
        }
        if (args.author) {
          const filter = { name: args.author };
          return (await books(null, filter)).filter(
            (book) => book.author !== null
          );
        }
        return await books();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    allAuthors: async () => {
      try {
        const books = await Book.find({}).populate("author");
        const authors = await Author.find({});

        console.log("book query");
        console.log("authors query");

        const booksByAuthor = _.groupBy(books, (book) => book.author.name);
        const authorByNames = _.groupBy(authors, (author) => author.name);

        return Object.keys(booksByAuthor).map((author) => {
          return {
            name: author,
            born: authorByNames[author][0].born || null,
            bookCount: booksByAuthor[author].length,
          };
        });
      } catch (error) {}
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Authentication denied!");

      try {
        let author = await Author.findOne({ name: args.author });

        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        const book = new Book({ ...args, author: author._id });
        await book.save();
        pubSub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });
        return book.populate("author");
      } catch (error) {
        console.log(error.message);
        throw new UserInputError(error.message);
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Authentication denied!");
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
        return updatedAuthor;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ ...args });
        await user.save();
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });

        if (!user || args.password !== "secret") {
          throw new UserInputError("wrong name or password");
        }
        const userForToken = { username: user.username, id: user._id };
        const token = jwt.sign(userForToken, "SECRET");
        return { value: token };
      } catch (error) {}
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
