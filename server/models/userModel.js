import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: Number,
    },

    isActive: {
      type: Boolean,
      default: true
    },

    totalSpend: {
      type: Number,
    },

    totalOrders: {
      type: Number,
    },

    role: {
      type:String,
      enum: [customer, admin],
      default: 'customer'
    },

    loyaltyPoints: {
      type: Number,
    },
 
    refreshToken: {
      type: String
    },

    refreshTokenExpiresTime:{
      type: Date,
    },

     lastLogin: {
      type: Date,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
