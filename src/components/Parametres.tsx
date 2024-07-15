import Layout from "./Layout";
import React, { useEffect, useState, ChangeEvent, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Parametres = ()=>{
    const { isAuthenticated, login, user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();



    return(
        <Layout>
           <></>
        </Layout>
    )
}

export default Parametres;