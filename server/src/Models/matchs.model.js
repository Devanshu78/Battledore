import mongoose, { Schema } from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    firstTeamScore: {
      type: String,
    },
    secondTeamScore: {
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
      trime: true,
      enum: ["silver", "gold", "premium"],
    },
    numberofplayer: {
      type: String,
      required: true,
      trime: true,
      enum: ["single", "doubles"],
    },
    firstTeamName: {
      type: String,
      required: true,
      trime: true,
    },
    secondTeamName: {
      type: String,
      required: true,
      trime: true,
    },
    playerone: {
      type: String,
      required: true,
      trime: true,
    },
    playertwo: {
      type: String,
      required: true,
      trime: true,
    },
    playerthree: {
      type: String,
      default: "no player",
      trime: true,
    },
    playerfour: {
      type: String,
      default: "no player",
      trime: true,
    },
    // firstTeamScore: {
    //   type: String,
    //   default: "0",
    // },
    // secondTeamScore: {
    //   type: String,
    //   default: "0",
    // },
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
      trime: true,
    },
    eventDetail: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

export const Match = mongoose.model("Match", matSchema);
