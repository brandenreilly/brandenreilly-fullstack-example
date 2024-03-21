import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ContactCard } from "./component/contactcard.jsx";
import { LoginPage } from "./component/login.jsx";
import { CreateContact } from "./component/createcontact.jsx";

export const AppContext = React.createContext(null)

//create your first component
const Layout = () => {
    const [user, setUser] = useState({})
    const [contacts, setContacts] = useState([])
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <AppContext.Provider value={{ user , setUser , contacts, setContacts}}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<CreateContact />} path="/createcontact"/>
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<ContactCard />} path="/contacts" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>401 : Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
};

export default injectContext(Layout);
