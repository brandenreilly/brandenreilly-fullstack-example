import React, { useContext, useState } from "react";
import { AppContext } from "../layout";

export const CreateContact = () => {
    const { user, contacts, setContacts } = useContext(AppContext)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
        })
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
        </div>
    )
}