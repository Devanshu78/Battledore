import { Router } from "express";
import { authMiddleware } from "../Middleware/authmiddleware.js";
import {
  loginUser,
  registerUser,
  allUsers,
  getUser,
  updateUserDetail,
  newCreatedPassword,
} from "../Controllers/user.controller.js";
import {
  getAllEvents,
  setEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/event.controller.js";

import email from "../Controllers/mail.controller.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(email);
router.route("/newcreatedpassword").post(newCreatedPassword);

router.route("/players").get(authMiddleware, allUsers);
router.route("/getmydata").get(authMiddleware, getUser);
router.route("/updatemydata").put(authMiddleware, updateUserDetail);
router.route("/events").get(authMiddleware, getAllEvents);
router.route("/events/post").post(authMiddleware, setEvent);
router.route("/events/update/:eventId").put(authMiddleware, updateEvent);
router.route("/events/delete/:eventId").delete(authMiddleware, deleteEvent);

export default router;
