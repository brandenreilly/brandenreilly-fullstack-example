import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container d-flex justify-content-between">
				<Link to="/">
					<span className="navbar-brand mb-auto h1">Home</span>
				</Link>
				<div className="">
					<Link to={"/contacts"}>
					<a style={{textDecoration: "none", color: "black"}}><h1>Contacts</h1></a>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-dark"><i className="fa-solid fa-user"></i>LOG IN</button>
					</Link>
					<Link to={"/createcontact"}>
						<button className="btn btn-primary">Create Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
 