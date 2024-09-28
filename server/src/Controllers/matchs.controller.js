import { Match } from "../Models/matchs.model.js";

const addMatch = async (req, res) => {
  try {
    const {
      eventPlace,
      numberOfPlayers,
      firstTeamName,
      secondTeamName,
      playerOne,
      playerTwo,
      playerThree,
      playerFour,
      eventDetails,
    } = req.body;
    if (
      [
        eventPlace,
        numberOfPlayers,
        firstTeamName,
        secondTeamName,
        playerOne,
        playerTwo,
        eventDetails,
      ].some((field) => field?.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMatch = new Match({
      eventPlace,
      numberOfPlayers,
      firstTeamName,
      secondTeamName,
      playerOne,
      playerTwo,
      playerThree,
      playerFour,
      eventDetails,
      referee: req?.user?.username || "YOYO",
    });

    await newMatch.save();

    const populatedMatch = await Match.findById(newMatch._id).populate(
      "eventDetails"
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
      } else if (error.errors.numberOfPlayers) {
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

const getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate("eventDetails");
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { winner } = req.body;
    const { matchId } = req.params;

    const updatedMatch = await Match.findByIdAndUpdate(
      { _id: matchId },
      {
        winner,
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
    const existingMatch = await Match.findById({ _id: matchId });
    if (!existingMatch) {
      return res.status(404).json({ message: "Match details not found" });
    }

    const deletedMatch = await Match.findByIdAndDelete({ _id: matchId });
    if (!deletedMatch) {
      return res
        .status(500)
        .json({ message: "Something went wrong while deleting the match" });
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
      "eventDetails"
    );
    if (!onGoingMatch) {
      return res.status(404).json({ message: "Match details not found" });
    }
    return res.status(200).json({ match: onGoingMatch });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addMatch, getMatches, deleteMatch, updateMatch, onGoingMatch };
