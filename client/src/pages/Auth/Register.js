import React, { useState } from "react";
import Layout from "../../comopnents/Layout/Layout.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhoneNumber] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/api/v1/auth/register", {
				name,
				email,
				password,
				address,
				phone,
			})
			.then((res) => {
				if (res.data.success) {
					toast.success(res.data.message);
					navigate("/login");
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {
				console.error("err", err);
			});
	};
	return (
		<Layout title={"Register-Ecommerce App"}>
			<ToastContainer />

			<div className="form-container" style={{ minHeight: "90vh" }}>
				<form className="d-flex-column" onSubmit={handleSubmit}>
					<h2 className="title">Register Form</h2>
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							id="inputEmail4"
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="Enter Your Name"
							required
						/>
					</div>
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
					<div className="mb-3">
						<input
							type="number"
							className="form-control"
							id="inputPassword4"
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
							placeholder="Enter Your Phone Number"
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="inputAddress2"
							onChange={(e) => {
								setAddress(e.target.value);
							}}
							placeholder="Enter Your Address"
							required
						/>
					</div>
					<button type="submit" className="btn btn-dark">
						Register
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Register;
