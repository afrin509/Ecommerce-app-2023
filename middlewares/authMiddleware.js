import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const requireSignIn = async (req, res, next) => {
	console.log("inside requireAuthorisation", req.body);
	const authHeader = req.headers["authorization"];
	console.log("authHeader", authHeader);
	const token = authHeader;
	if (!token) {
		return res.status(401).send("Authorization failed. No access token.");
	}

	try {
		const decodedPayload = jwt.verify(token, process.env.JWT_SECRET, {
			algorithm: "HS256",
		});
		console.log("Decoded Payload:", decodedPayload);
		req.user = decodedPayload;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			console.log("JWT is expired");
		} else {
			console.log("Invalid JWT token", error.name, error);
		}
	}
};
//admin access
export const isAdmin = async (req, res, next) => { 
    console.log("req.user", req.user);
    const existingUser = await userModel.findById(req.user._id);
    console.log("existing user", existingUser);
    const token = existingUser.token;
	if (!token) {
		return res.status(401).send("Authorization failed. No access token.");
	} else {
		jwt.verify(
			token,
			process.env.JWT_SECRET,
			{
				algorithm: "HS256",
			},
            (err, decodedPayload) => {
                console.log("decodedPayload", decodedPayload);
				if (err) {
					return res.status(401).json({ message: "Sorry for the inconvineince,error occured" });
				} else {
					if (decodedPayload.role !== "admin") {
						return res
							.status(401)
							.json({ message: "Not authorized,Only admin have access" });
					} else {
						console.log("got admin access")
						next();
					}
				}
			}
		);
	}
};

