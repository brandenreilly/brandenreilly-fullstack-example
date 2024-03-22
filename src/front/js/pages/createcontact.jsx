import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";

export const CreateContact = () => {
    const { user, contacts, setContacts } = useContext(AppContext)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [relation, setRelation] = useState("")
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    const handleCreateContact = () => {
        if(relation == ""){
            alert("Please select a relationship to continue.")
        }
        else{
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: user.id,
                    full_name: fullName,
                    email: email,
                    address: address,
                    phone: phone,
                    relation: relation
                })
            }
            fetch("https://jubilant-bassoon-699xr9r9gvgqcr779-3001.app.github.dev/api/createcontact", options)
            .then(resp => {
                if (resp.ok){
                    return resp.json()
                }
                else {
                    if(resp.status == 409){
                        return alert("A contact with this email already exists.")
                    }
                    else{
                        return alert("Unknown Error")
                    }
                }
            }).then(data => setContacts(data))
            handleResetFields();
            setVisible(true)
        }
    }

    const handleResetFields = () => {
        setFullName("");
        setEmail("");
        setAddress("");
        setPhone("")
    }

    return (
        <div className="container">
            <div className="" style={{display: visible ? "" : "none"}}>
                <div className="alert alert-success text-center alertMsg" onClick={()=>{navigate('/contacts')}}>Contact has been created. Click here to go back to the contacts page.</div>
            </div>
            <form className="createContactForm align-items-center">
            <div className="d-flex justify-content-center createInput">
                <label className="createInputLabel" htmlFor="fullName">Full Name:</label>
                <input type="text" value={fullName} onChange={(e)=>{setFullName(e.target.value)}}></input>
            </div>
            <div className="d-flex justify-content-center createInput">
                <label className="createInputLabel" htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            </div>
            <div className="d-flex justify-content-center createInput">
                <label className="createInputLabel" htmlFor="address">Address:</label>
                <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
            </div>
            <div className="d-flex justify-content-center createInput">
                <label className="createInputLabel" htmlFor="phone">Phone:</label>
                <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}}></input>
            </div>
            <div className="d-flex justify-content-center createInput">
                <label htmlFor="relation" className="createInputLabel">Relationship:</label>
                <select required id="relation" onChange={(e)=>{if(e.target.value != "Select One"){setRelation(e.target.value)}}}>
                    <option>Select One</option>
                    <option>Family</option>
                    <option>Friend</option>
                    <option>Business</option>
                </select>
            </div>
            <div className="d-flex justify-content-center createButton">
                <button type="button" className="btn btn-primary" onClick={()=>{handleCreateContact();}} >Create Contact</button>
            </div>
            </form>
        </div>
    )
}