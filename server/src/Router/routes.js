import { Router } from "express";
import { authMiddleware } from "../Middleware/authmiddleware.js";
import {
  loginUser,
  registerUser,
  allUsers,
  getUser,
  updateUserDetail,
} from "../Controllers/user.controller.js";
import {
  getAllEvents,
  setEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/event.controller.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/players").get(allUsers);
// router.route("/events").get(getAllEvents);
// router.route("/events/post").post(setEvent);
// router.route("/events/update/:eventId").put(updateEvent);
// router.route("/events/delete/:eventId").delete(deleteEvent);
router.route("/players").get(authMiddleware, allUsers);
router.route("/getmydata").get(authMiddleware, getUser);
router.route("/updatemydata").put(authMiddleware, updateUserDetail);
router.route("/events").get(authMiddleware, getAllEvents);
router.route("/events/post").post(authMiddleware, setEvent);
router.route("/events/update/:eventId").put(authMiddleware, updateEvent);
router.route("/events/delete/:eventId").delete(authMiddleware, deleteEvent);

export default router;
