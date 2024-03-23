import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container-body">
			<div className="row">
				<div className="col-4 text-center mt-3">
					<img style={{height: "200px" , width: "200px"}} src="https://cdn.icon-icons.com/icons2/3106/PNG/512/communication_contact_address_book_contacts_icon_191613.png" alt="contact-icon" />
				</div>
				<div className="col-8 d-flex align-items-center homePageDiv">
					<div className="row">
						<h1 className="" style={{marginLeft: "40px"}}>Contact List</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
