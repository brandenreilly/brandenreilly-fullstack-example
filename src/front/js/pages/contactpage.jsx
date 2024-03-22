import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";
import { ContactCard } from "./contactcard.jsx";


export const ContactPage = () => {
    const { user , setUser , contacts , setContacts , modalId } = useContext(AppContext)

    const handle_get_contacts = () => {
        fetch(`https://jubilant-bassoon-699xr9r9gvgqcr779-3001.app.github.dev/api/contacts/${user.id}`)
        .then(resp => resp.json())
        .then(data => setContacts(data))
    }

    useEffect(()=>{handle_get_contacts()},[])

    const handleDeleteContact = () => {
		const options = { method: 'DELETE' }
		fetch(`https://jubilant-bassoon-699xr9r9gvgqcr779-3001.app.github.dev/api/contacts/delete/${user.id}/${modalId}`, options)
		.then(resp => resp.json())
		.then(data => setContacts(data))
	}

    return (
        <div className="container">
            {contacts.length > 0 && contacts.map((contact, index)=>{
                return <ContactCard key={index} contact={contact} index={index} />
            })}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
  				<div className="modal-dialog">
    				<div className="modal-content">
      					<div className="modal-header">
        					<h5 className="modal-title" id="staticBackdropLabel">WARNING</h5>
        					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      					</div>
      					<div className="modal-body">
        					<p>Are you really sure you'd like to delete this contact? This cannot be undone.</p>
      					</div>
      					<div className="modal-footer">
        					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        					<button type="button" className="btn btn-danger" onClick={()=>{handleDeleteContact()}} data-bs-dismiss="modal">Delete</button>
      					</div>
    				</div>
  				</div>
			</div>
        </div>

    )
}