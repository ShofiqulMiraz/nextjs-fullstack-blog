import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcryptjs";
import crypto from "crypto";

// creating User model
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  passwordIssueTime: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

// hashing password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  //   hash password with a cost of 12
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  next();
});

// setting passwordIssueTime for new and updated/reseted password
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.passwordIssueTime = Date.now() - 1000;
  }
  next();
});

// comparing password for login
userSchema.methods.comparePassword = async function (
  candidatePassword,
  storedPassword
) {
  return await bcrypt.compare(candidatePassword, storedPassword);
};

// checking if password changed after jwt issued time
userSchema.methods.passwordChagedAfterJWT = function (JWTIssueTime) {
  const user = this;
  if (user.passwordIssueTime) {
    const passwordIssueTime = parseInt(
      user.passwordIssueTime.getTime() / 1000,
      10
    );
    return passwordIssueTime > JWTIssueTime;
  }

  return false;
};

// create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const user = this;
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
