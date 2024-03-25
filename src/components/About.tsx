import Layout from "./Layout"
import cascade from "../img/bannierejpg.jpg"
import { useState } from "react";

const About = () =>{
 
    return(
        <Layout>
            <div className="bg-page">
                <img src={cascade} alt="" className="carrousel-size"/>
                <div className="container mt-5 d-flex">
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                </div>
                <div className="container mt-5">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                    </p><br/>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                    </p><br/>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                    </p><br/>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                    </p><br/>
                </div>
                <div className="container mt-5 d-flex">
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About;