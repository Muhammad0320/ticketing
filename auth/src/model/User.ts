import mongoose from "mongoose";

interface UserType {
  email: string;
  password: string;
}

type UserDoc = mongoose.Document & UserType;

interface UserModel extends mongoose.Model<UserDoc> {
  buildUser(attrs: UserType): Promise<UserDoc>;
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

userSchema.statics.buildUser = async (attrs: UserType) => {
  const user = await User.create({
    email: attrs.email,
    password: attrs.password,
  });

  return user;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
