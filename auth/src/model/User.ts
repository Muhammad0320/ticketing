import mongoose from "mongoose";

interface UserType {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

const User = mongoose.model("user", userSchema);

userSchema.statics.buildUser = (attrs: UserType) => {
  return new User({ email: attrs.email, password: attrs.password });
};

export { User };
