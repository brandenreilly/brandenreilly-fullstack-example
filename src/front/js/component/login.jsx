import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../layout";

export const LoginPage = () => {
    const { user , setUser , contacts, setContacts } = useContext(AppContext)
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const handleGetUser = () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput,
                is_active: true
            })
        }
        fetch("https://jubilant-bassoon-699xr9r9gvgqcr779-3001.app.github.dev/api/getuser", options)
        .then(resp => {
            if(resp.ok){
                return resp.json()
            }
            else{
                if (resp.status == 403){
                    alert("Incorrect password.")
                    return resp.status
                }
                else if (resp.status == 401){
                    alert("Email not found, please sign up.")
                    return resp.status
                }
            }
        })
        .then(data => setUser(data))
    }

    const handleGetContacts = () => {
        fetch(`https://jubilant-bassoon-699xr9r9gvgqcr779-3001.app.github.dev/api/contacts/${user.id}`)
        .then(resp => {
            if (resp.ok){
                return resp.json()
            }
            else{
                return resp.status
            }
        })
        .then(data => setContacts(data))
    }
useEffect(()=>{handleGetContacts()},[user])

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="borderDiv">
                <h1 className="mb-5 text-center d-flex justify-content-center align-items-center w-100">Login</h1>
                <div className="text-center mb-2 mx-auto w-100 d-flex justify-content-center align-items-center" style={{ display: "block" }}>
                    <label htmlFor="emailInput"><i className="fa-solid fa-at" style={{ width: "20px", height: "20px", marginRight: "10px" }}></i></label>
                    <input style={{width: "250px"}} id="emailInput" type="text" value={emailInput} onChange={(e) => { setEmailInput(e.target.value) }} />
                </div>
                <div className="text-center mb-2 mx-auto w-100 d-flex justify-content-center align-items-center" style={{ display: "block" }}>
                    <label htmlFor="password"><i className="fas fa-key" style={{ width: "20px", height: "20px", marginRight: "10px" }}></i></label>
                    <input style={{width: "250px"}} id="password" type="password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }} onKeyUp={(e) => { if (e.key === "Enter") { handleGetUser(); setPasswordInput(""); setUserInput("") } }} />
                </div>
                <div className="text-center mx-auto">
                    <button className="mt-3 mb-5 btn btn-primary loginPageBtn" onClick={() => {handleGetUser();setPasswordInput(""); setEmailInput("") }}>
                        Login
                    </button>
                </div>
                <div className="text-center mx-auto">
                        <a href="/"><strong>New user? Click here to sign up.</strong></a>      
                </div>
            </div>
        </div>
    )
}