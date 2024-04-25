import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Layout from "../Layout/Layout.js";

const Spinner = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [count, setCount] = useState(5);
	useEffect(() => {
		const timer = setInterval(() => {
            setCount((prevCount) => --prevCount);
			console.log("inside useeffect");
		}, 1000);
		
		if (count <= 0) {
			navigate("/login", {
					state:location.pathname
				});
				return clearInterval(timer);
		}
		
		return () => clearInterval(timer);
	}, [count]);
	return (
		<Layout className="text-center d-flex align-items-center justify-content-center">
			<h6>Redirecting you in {count} seconds</h6>

			<div className="spinner-border mb-5" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</Layout>
	);
};

export default Spinner;
