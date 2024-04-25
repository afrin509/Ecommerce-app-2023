import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const sendEmail = async (email, subject, payload, template) => {
	try {
		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "dafrin148@gmail.com",
				pass: "obbhmvpslwiheyve", // naturally, replace both with your real credentials or an application-specific password
			},
		});

		const source = fs.readFileSync(path.join(__dirname, template), "utf8");

		const compiledTemplate = handlebars.compile(source);
		const options = () => {
			return {
				from: "dafrin148@gmail.com",
				to: email,
				subject: subject,
				html: compiledTemplate(payload),
			};
		};

		// Send email
		transporter.sendMail(options(), (error, info) => {
			if (error){
				console.log("error inside sendEmail function",error)
				return error;
			} else {
				return res.status(200).json({
					success: true,
				});
			}
		});
	} catch (error) {
		console.log("error in sendEmail function", error);
		return error;
	}
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

export default sendEmail;
