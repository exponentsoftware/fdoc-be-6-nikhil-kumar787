import express from "express";
import { addLikes, addRating, addViews } from "../controller/featureController";
const router = express.Router();

router.route("/like").post(addLikes);
router.route("/view").post(addViews);
router.route("/rating").post(addRating);

export default router;
