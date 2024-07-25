import Layout from "./Layout";
import React, { useEffect, useState, ChangeEvent, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../parametres.css';

const Parametres = ()=>{
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    

    return (
        <Layout>
            <div className="bg-page">
                <div className="line-separator"></div>
                <div className="container light-style flex-grow-1 container-p-y">
                    <div className="text-center">
                        <h2 className="text-color font-bolder mb-1"> Mes paramètres </h2>
                    </div>
                    <div className="card overflow-hidden">
                        <div className="row no-gutters row-bordered row-border-light">
                            <div className="col-md-3 pt-0">
                                <div className="list-group list-group-flush account-settings-links">
                                    <a className="list-group-item list-group-item-action active" data-toggle="list"
                                        href="#account-general">General</a>
                                    <a className="list-group-item list-group-item-action" data-toggle="list"
                                        href="#account-change-password">Change password</a>
                                    <a className="list-group-item list-group-item-action" data-toggle="list"
                                        href="#account-info">Info</a>                                   
                                </div>
                            </div>

                            <div className="col-md-9">
                                <div className="tab'content">
                                    <div className="tab-pane fade active show" id="account-general">
                                        <hr className="border-light m-0"/>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="form-label">Prénom</label>
                                                <input type="text" className="form-control mb-1" value={user?.prenom}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Nom</label>
                                                <input type="text" className="form-control" value={user?.nom}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">E-mail</label>
                                                <input type="text" className="form-control mb-1" value={user?.email}/>
                                                <div className="alert alert-warning mt-3">
                                                    Your email is not confirmed. Please check your inbox.<br/>
                                                    <a href="javascript:void(0)">Resend confirmation</a>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Téléphone</label>
                                                <input type="text" className="form-control" value={user?.telephone}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="account-change-password">
                                        <div className="card-body pb-2">
                                            <div className="form-group">
                                                <label className="form-label">Current password</label>
                                                <input type="password" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">New password</label>
                                                <input type="password" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Repeat new password</label>
                                                <input type="password" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Parametres;