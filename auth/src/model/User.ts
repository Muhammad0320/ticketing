import mongoose from "mongoose";

interface UserType {
  email: string;
  password: string;
}

type UserDoc = mongoose.Document & UserType;

interface UserModel extends mongoose.Model<UserDoc> {
  buildUser(attrs: UserType): UserDoc;
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

userSchema.statics.buildUser = (attrs: UserType) => {
  return new User({ email: attrs.email, password: attrs.password });
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
