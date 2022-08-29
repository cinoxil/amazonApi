const mongoose = require("mongoose");
const stringDb =
  "mongodb+srv://bfz:1Ci2AylqKEyaOwgF@cluster0.e8z9p.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(stringDb);

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
