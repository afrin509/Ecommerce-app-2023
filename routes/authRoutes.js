import express from "express";
const router = express.Router();
import {
	registerController,
	loginController,
	testController,
	forgotPasswordController,
	resetPasswordController,
	resetPasswordController1,
	updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/test", requireSignIn, isAdmin, testController);
//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
	res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
	res.status(200).send({ ok: true });
});
router.post("/forgotPassword", forgotPasswordController);
router.get("/passwordReset/:id/:token", resetPasswordController);
router.post("/passwordReset/:id/:token", resetPasswordController1);
router.post("/passwordReset/:id/:token/:somePath", (req, res) => {
	console.log("Help route...", req.body);
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
