import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div>
					<Link to={"/"}>
					<a style={{textDecoration: "none", color: "black"}}><h1>Contacts</h1></a>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary"></button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
