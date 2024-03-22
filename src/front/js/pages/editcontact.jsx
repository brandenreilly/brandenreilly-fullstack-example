import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../layout";

export const EditContact = () => {
    const { user, setUser, contacts, setContacts } = useContext(AppContext)
    const [toBeEdited, setToBeEdited] = useState({})
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const location = useLocation()
    
    useEffect(()=>{
       handleGetContactInfo() 
    },[])
    useEffect(()=>{handleSetData()},[toBeEdited])

    const handleResetFields = () => {
        setFullName("");
        setAddress("");
        setEmail("");
        setPhone("");
    }
    
    const handleGetContactInfo = () => {
        let contactID = location.state.contactID 
        
        fetch(`https://jubilant-bassoon-699xr9r9gvgqcr779-3001.app.github.dev/api/contacts/get/${contactID}`)
        .then(resp => resp.json())
        .then(data => setToBeEdited(data))
    }
    
    const handleSetData = () => {
        setFullName(toBeEdited.full_name)
        setAddress(toBeEdited.address)
        setEmail(toBeEdited.email)
        setPhone(toBeEdited.phone)
    }

    const handleEditContact = () => {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: location.state.contactID,
                full_name: fullName,
                email: email,
                address: address,
                phone: phone
            })
        }
        fetch(`https://jubilant-bassoon-699xr9r9gvgqcr779-3001.app.github.dev/api/contacts/edit/${location.state.contactID}`, options)
        .then(resp => resp.json())
        .then(data => setToBeEdited(data))
    }


    return (
        <div className="container">
            <div>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" value={fullName} onChange={(e)=>{setFullName(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}}></input>
            </div>
            <div>
                <button className="btn btn-primary" onClick={()=>{handleEditContact();handleResetFields()}} >Update Contact</button>
            </div>
        </div>
    )
}