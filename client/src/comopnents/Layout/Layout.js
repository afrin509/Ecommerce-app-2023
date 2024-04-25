import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";

const Layout = ({ children,title,description,keywords,author,...props }) => {
	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta name="author" content={author} />
			</Helmet>

			<Header />
			<div {...props} style={{ minHeight: "80vh" }}>
				{children}
			</div>
			<Footer />
		</div>
	);
};
Layout.defaultProps = {
	title: "Ecommerce App",
	description: "Mern Stack Project",
	keywords: 'mern,react,node,mongodb',
	author:"Dudekula Afrin"
}
export default Layout;
