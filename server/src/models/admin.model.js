import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema(
  {
    adminUsername: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    full_name: {
      type: String,
      required: true,
      default: "dhruv kumar",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      full_name: this.full_name,
    },
    process.env.JWTSECRET,
    {
      expiresIn: "7d",
    }
  );
};

const PlatformAdmin = mongoose.model("PlatformAdmin", adminSchema);

export default PlatformAdmin;
