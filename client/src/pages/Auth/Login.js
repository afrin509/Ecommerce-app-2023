import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../comopnents/Layout/Layout.js";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/auth.js";

const Login = () => {
	const [email, setEmail] = useState("");
	const location = useLocation();
	const [password, setPassword] = useState("");
	const [auth, setAuth] = useAuth();

	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/api/v1/auth/login", {
				email,
				password,
			})
			.then((res) => {
				if (res.data) {
					toast.success(res.data.message);
					localStorage.setItem("user", JSON.stringify(res.data.user));
					localStorage.setItem("token", res.data.user.token);
					setAuth({
						user: res.data.user,
						token: res.data.user.token,
					});
					console.log("useAuth", auth.user);
					console.log("location.state", location.state);
					navigate(location.state || "/Home");
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {
				console.error("err", err);
			});
	};
	const handleForgotPassword = (e) => {
		e.preventDefault();
		navigate("/forgotPassword");
	};
	return (
		<Layout title={"Login-Ecommerce App"}>
			<ToastContainer />

			<div className="form-container" style={{ minHeight: "90vh" }}>
				<form
					className="d-flex flex-column justify-content-between"
					style={{ gap: "1px", textAlign: "center" }}
					onSubmit={handleSubmit}>
					<h2 className="title">Login Form</h2>

					<div className="mb-3">
						<input
							type="email"
							className="form-control"
							id="inputEmail4"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="Enter Your Email"
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							className="form-control"
							id="inputPassword4"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder="Enter Your Password"
							required
						/>
					</div>

					<button type="submit" className="btn btn-dark">
						Login
					</button>
					<button onClick={handleForgotPassword} className="btn btn-dark">
						ForgotPassword
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
