import { User } from "../Models/user.model.js";

const registerUser = async (req, res) => {
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

  const user = await User.create({ jobrole, username, email, password });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "Something went wrong while registering the user" });
  }

  return res
    .status(201)
    .json({ data: createdUser, message: "User register successfully" });
};

const loginUser = async (req, res) => {
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
      return res.status(404).json({ message: "Event not found" });
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

export { registerUser, loginUser, allUsers, getUser, updateUserDetail };
