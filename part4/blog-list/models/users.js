const mongoose = require("mongoose");

const blogUserSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    minLength: [3, "invalid username or password"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  blog: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

blogUserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

const BlogUser = mongoose.model("BlogUser", blogUserSchema);

module.exports = BlogUser;
