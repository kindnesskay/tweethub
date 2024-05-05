import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    id: String,
    fullname: {
      type: String,
      default:""
    },
    usermame: { type: String ,default:""},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    join_date: { type: Date, default: Date.now },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
