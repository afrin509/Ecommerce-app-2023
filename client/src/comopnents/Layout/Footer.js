import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<h4 className="text-center"> All Right Reserved &copy; Ecommerce App </h4>
			<p className="text-center mt-3">
                <Link to="/About">About</Link>|
                <Link to="/Contact">Contact</Link>|
				<Link to="/PrivacyPolicy">Privacy Policy</Link>
			</p>
		</div>
	);
};

export default Footer;
