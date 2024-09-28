import mongoose, { Schema } from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    firstTeamScore: {
      type: String,
    },
    secondTeamScore: {
      type: String,
    },
    numberOfShuttlecock: {
      type: String,
    },
  },
  { timestamps: true }
);

const matSchema = new Schema(
  {
    eventPlace: {
      type: String,
      required: true,
      trim: true,
      enum: ["silver", "gold", "premium"],
    },
    numberOfPlayers: {
      type: String,
      required: true,
      trim: true,
      enum: ["single", "doubles"],
    },
    firstTeamName: {
      type: String,
      required: true,
      trim: true,
    },
    secondTeamName: {
      type: String,
      required: true,
      trim: true,
    },
    playerOne: {
      type: String,
      required: true,
      trim: true,
    },
    playerTwo: {
      type: String,
      required: true,
      trim: true,
    },
    playerThree: {
      type: String,
      default: "no player",
      trim: true,
    },
    playerFour: {
      type: String,
      default: "no player",
      trim: true,
    },
    scores: [scoreSchema],
    winner: {
      type: String,
      default: "not played",
    },
    isPlayed: {
      type: Boolean,
      required: true,
      default: false,
    },
    referee: {
      type: String,
      required: true,
      trim: true,
    },
    eventDetails: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

export const Match = mongoose.model("Match", matSchema);
