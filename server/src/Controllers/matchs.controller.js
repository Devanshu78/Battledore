import { Match } from "../Models/matchs.model.js";
import { getIO } from "../app.js";

const addMatch = async (req, res) => {
  try {
    const {
      eventPlace,
      numberofplayer,
      firstTeamName,
      secondTeamName,
      playerone,
      playertwo,
      playerthree,
      playerfour,
      eventDetail,
    } = req.body;
    if (
      [
        eventPlace,
        numberofplayer,
        firstTeamName,
        secondTeamName,
        playerone,
        playertwo,
        eventDetail,
      ].some((field) => field?.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMatch = new Match({
      eventPlace,
      numberofplayer,
      firstTeamName,
      secondTeamName,
      playerone,
      playertwo,
      playerthree,
      playerfour,
      eventDetail,
      referee: req?.user?.username || "YOYO",
    });

    await newMatch.save();

    const populatedMatch = await Match.findById(newMatch._id).populate(
      "eventDetail"
    );

    res.status(201).json({
      message: "Let's Play!!!",
      gameId: populatedMatch._id,
      match: populatedMatch,
    });
  } catch (error) {
    if (error.name == `ValidationError`) {
      if (error.errors.eventPlace) {
        return res
          .status(400)
          .json({ message: "Select only silver, gold or premium" });
      } else if (error.errors.numberofplayer) {
        return res
          .status(400)
          .json({ message: "Select only single or doubles" });
      }
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getMatchs = async (req, res) => {
  try {
    const matches = await Match.find().populate("eventDetail");
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { winner, firstTeamScore, secondTeamScore } = req.body;
    const { matchId } = req.params;

    const updatedMatch = await Match.findByIdAndUpdate(
      { _id: matchId },
      {
        winner,
        firstTeamScore,
        secondTeamScore,
        isPlayed: true,
      },
      {
        new: true,
      }
    );
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match details not found" });
    }

    return res.status(200).json({ message: "Match Ends" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const existedMatch = await Match.findById({ _id: matchId });
    if (!existedMatch) {
      return res.status(404).json({ message: "Match details not found" });
    }

    const deletedMatch = await Match.findByIdAndDelete({ _id: matchId });
    if (!deletedMatch) {
      return res
        .status(500)
        .json({ message: "Something went wrong while deleting the event" });
    }

    return res.status(200).json({
      message: "Match deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const onGoingMatch = async (req, res) => {
  try {
    const { gameId } = req.params;
    const onGoingMatch = await Match.findById({ _id: gameId }).populate(
      "eventDetail"
    );
    if (!onGoingMatch) {
      return res.status(404).json({ message: "Match details not found" });
    }
    return res.status(200).json({ match: onGoingMatch });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addMatch, getMatchs, deleteMatch, updateMatch, onGoingMatch };
