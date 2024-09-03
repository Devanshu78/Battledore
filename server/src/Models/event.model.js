import mongoose, { Schema } from "mongoose";

const eveSchema = new Schema(
  {
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },
    eventStart: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    eventEnd: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    eventDesc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", eveSchema);
