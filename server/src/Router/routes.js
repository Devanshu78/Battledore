import { Router } from "express";
import { authMiddleware } from "../Middleware/authmiddleware.js";
import {
  loginUser,
  registerUser,
  allUsers,
  getUser,
  updateUserDetail,
  newCreatedPassword,
  deleteUser,
} from "../Controllers/user.controller.js";
import {
  getAllEvents,
  setEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/event.controller.js";

import email from "../Controllers/mail.controller.js";
import {
  addMatch,
  getMatchs,
  deleteMatch,
  updateMatch,
  onGoingMatch,
} from "../Controllers/matchs.controller.js";

const router = Router();

// user routes
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(email);
router.route("/newcreatedpassword").post(newCreatedPassword);
router.route("/users/delete/:userId").delete(authMiddleware, deleteUser);

// event routes
router.route("/players").get(authMiddleware, allUsers);
router.route("/getmydata").get(authMiddleware, getUser);
router.route("/updatemydata").put(authMiddleware, updateUserDetail);
router.route("/events").get(authMiddleware, getAllEvents);
router.route("/events/post").post(authMiddleware, setEvent);
router.route("/events/update/:eventId").put(authMiddleware, updateEvent);
router.route("/events/delete/:eventId").delete(authMiddleware, deleteEvent);

// match routes
router.route("/match/add").post(authMiddleware, addMatch);
router.route("/match/:gameId").get(onGoingMatch);
router.route("/matchs").get(authMiddleware, getMatchs);
router.route("/removeMatch/:matchId").delete(authMiddleware, deleteMatch);
router.route("/winner/:matchId").patch(authMiddleware, updateMatch);

export default router;
