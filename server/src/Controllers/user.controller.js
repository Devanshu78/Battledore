import { User } from "../Models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { jobrole, username, email, password } = req.body;
    if (
      [jobrole, username, email, password].some((field) => field?.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    let user;

    if (jobrole.toLowerCase() === "match controller") {
      user = await User.create(req.body);
    } else {
      let tempholder;
      if (jobrole.toLowerCase() === "umpire") {
        tempholder = new User({
          ...req.body,
          isUmpire: true,
        });
      } else {
        tempholder = new User({
          ...req.body,
          isUmpire: true,
          isOperator: true,
        });
      }
      user = await User.create(tempholder);
    }

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering the user" });
    }

    return res
      .status(201)
      .json({ data: createdUser, message: "User register successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Please select from the dropdown",
        err: error.message,
      });
    }
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      details: user,
      message: "Login successful",
      token: user.generateToken(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    //middleare se data aa rha tha vhi send kr diya hai
    res.send(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserDetail = async (req, res) => {
  try {
    const { _id } = req.user;
    const existedEvent = await User.findById({ _id });
    if (!existedEvent) {
      return res.status(404).json({ message: "User not found" });
    }
    const { jobrole, username, email } = req.body;
    if ([jobrole, username, email].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedDetails = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedDetails) {
      return res
        .status(500)
        .json({ message: "Something went wrong while updating your data" });
    }

    return res.status(200).json({
      data: updatedDetails,
      message: "Your data is updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const newCreatedPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    const updatedDetails = await user.save();

    if (!updatedDetails) {
      return res
        .status(500)
        .json({ message: "Something went wrong while updating your data" });
    }

    return res.status(200).json({
      message: "Your data is updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const existedUser = await User.findById({ _id: userId });
    if (!existedUser) {
      return res.status(404).json({ message: "User details not found" });
    }

    const deletedUser = await User.findByIdAndDelete({ _id: userId });
    if (!deletedUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while deleting the event" });
    }

    return res
      .status(200)
      .json({ data: deletedUser, message: "User is removed successfully" });
  } catch (err) {
    console.log(err);
  }
};

export {
  registerUser,
  loginUser,
  allUsers,
  getUser,
  updateUserDetail,
  newCreatedPassword,
  deleteUser,
};
