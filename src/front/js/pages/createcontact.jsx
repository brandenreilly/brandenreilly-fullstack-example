import React, { useContext, useState } from "react";
import { AppContext } from "../layout";

export const CreateContact = () => {
    const { user, contacts, setContacts } = useContext(AppContext)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const handleCreateContact = () => {
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
                phone: phone
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
    }

    const handleResetFields = () => {
        setFullName("");
        setEmail("");
        setAddress("");
        setPhone("")
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
                <button className="btn btn-primary" onClick={()=>{handleCreateContact(); handleResetFields()}} >Create Contact</button>
            </div>
        </div>
    )
}