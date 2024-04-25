import React from "react";
import Layout from "../../comopnents/Layout/Layout.js";
import UserMenu from "../../comopnents/Layout/UserMenu.js";

const Orders = () => {
	return (
		<Layout title="Users-Orders">
			<div className="row">
				<div className="col-md-3">
					<UserMenu />
				</div>
				<div className="col-md-9">
					<h1>All orders</h1>
				</div>
			</div>
		</Layout>
	);                                          
};

export default Orders;
