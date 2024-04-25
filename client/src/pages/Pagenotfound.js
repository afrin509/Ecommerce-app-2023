import React from 'react'
import Layout from '../comopnents/Layout/Layout.js'

const Pagenotfound = () => {
  return (
		<Layout title={"Pagenotfound"}>
			<div
				className="pnf"
				style={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}>
				<h1 className="pnf-title">404</h1>
				<h4 className="pnf-heading">Oops! Page Not Found</h4>
				<button
					type="button"
					style={{ margin: "5px" }}
					className="btn btn-outline-secondary">
					Go Back
				</button>
			</div>
		</Layout>
	);
}

export default Pagenotfound