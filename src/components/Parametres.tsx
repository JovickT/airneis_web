import Layout from "./Layout";
import React, { useEffect, useState,ChangeEvent, FormEvent } from 'react';
import { useAuth } from "../context/AuthContext";
import '../parametres.css';
import axios from "../services/Axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

interface Adresse {
    id_adresse: number;
    pays: string;
    ville: string;
    code_postal: string;
    rue: string;
}

const Parametres = () => {
    const { user, checkAuthStatus, logout } = useAuth();
    const navigate = useNavigate();
    const [compte, setCompte] = useState({
        email: user?.email || '',
        prenom: user?.prenom || '',
        nom: user?.nom || '',
        telephone: user?.telephone || '',
    });
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nouvelleAdresse, setNouvelleAdresse] = useState({
        pays: '',
        ville: '',
        codePostal: '',
        rue: '',
    });
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [adresses, setAdresses] = useState<Adresse[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);


    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };
    
    useEffect(() => {
        checkAuthStatus();
    },[]);

    useEffect(() => {
        if (user) {
            setCompte(user);
        }
    }, [user]);

    useEffect(() => {
        if (activeTab === 'tab3') {
            fetchAdresses();
        }
    }, [activeTab]);

    const fetchAdresses = async () => {
        try {
            const response = await axios.get<Adresse[]>('/adresses');
            setAdresses(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des adresses', error);
            setMessage('Erreur lors de la récupération des adresses');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCompte(prevState=> ({
         ...prevState,
          [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put('/update-user', compte);
            checkAuthStatus(); 
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
        }
    };

    const handlePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/change-password', {
                currentPassword,
                newPassword,
                repeatNewPassword
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
        }
    };

    const handleNewAdresse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNouvelleAdresse(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewAdresseSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/add-adresse', nouvelleAdresse);
            setMessage('Adresse ajoutée avec succès');
            setNouvelleAdresse({
                pays: '',
                ville: '',
                codePostal: '',
                rue: ''
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'adresse', error);
            setMessage('Erreur lors de l\'ajout de l\'adresse');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete('/delete-account');
            alert(response.data.message);
            await logout();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
        }
        navigate('/');
    };

    return (
        <Layout>
            <div className="bg-page">
                <div className="line-separator"></div>
                <div className="container light-style flex-grow-1 container-p-y">
                    <div className="text-center">
                        <h2 className="text-color font-bolder mb-1"> Mes paramètres </h2>
                    </div>
                    {/* <div className="line-separator"></div> */}
                
                    <div className="row no-gutters row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'tab1' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab1')}
                                >
                                    Informations personnelles
                                </a>
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'tab2' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab2')}
                                >
                                    Changer le mot de passe
                                </a>
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'tab3' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab3')}
                                >
                                    Adresses de livraisons
                                </a>                                   
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'tab4' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab4')}
                                >
                                    Méthodes de paiement
                                </a>                                   
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'tab5' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab5')}
                                >
                                    Supprimer compte
                                </a>                                   
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="tab-content">
                                {activeTab === 'tab1' && (
                                    <div className="tab-pane fade active show" id="tab1">
                                        <hr className="border-light m-0"/>
                                        <form method="put" onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label className="paramettre">Prénom</label>
                                                    <input 
                                                        type="text" 
                                                        className="paramettre"
                                                        name="prenom" 
                                                        value={compte.prenom} 
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="paramettre">Nom</label>
                                                    <input 
                                                        type="text" 
                                                        className="paramettre" 
                                                        name="nom"
                                                        value={compte.nom} 
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="paramettre">E-mail</label>
                                                    <input  
                                                        type="email" 
                                                        className="paramettre " 
                                                        name="email"
                                                        value={compte.email} 
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="paramettre">Téléphone</label>
                                                    <input 
                                                        type="text" 
                                                        className="paramettre" 
                                                        name="telephone"
                                                        value={compte.telephone || ''} 
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
        
                                            <button type="submit" className="paramettre"> Enregistrer </button>
                                        </form>
                                    </div>

                                )}
                                
                                {activeTab === 'tab2' && (
                                    <div className="tab-pane fade active show" id="tab2">
                                        <form onSubmit={handlePassword}>
                                            <div className="card-body pb-2"> {/* ici */}
                                                <div className="form-group">
                                                    <label className="paramettre">Mot de passe actuel</label>
                                                    <input 
                                                        type="password" 
                                                        className="paramettre" 
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="paramettre">Nouveau mot de passe</label>
                                                    <input 
                                                        type="password" 
                                                        className="paramettre"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="paramettre">Validation du nouveau mot de passe</label>
                                                    <input 
                                                        type="password" 
                                                        className="paramettre"
                                                        value={repeatNewPassword}
                                                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="paramettre"> Enregistrer </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                
                                {activeTab === 'tab3' && (
                                    <div className="tab-pane fade active show" id="tab3">
                                        {/* <div className="card-body pb-2"> */}
                                        <div className="paramettre-mt">
                                        <h3>Mes adresses</h3>
                                            {adresses.length > 0 ? (
                                                <ul>
                                                    {adresses.map((adresse) => (
                                                        <li key={adresse.id_adresse}>
                                                            {adresse.rue}, {adresse.code_postal} {adresse.ville}, {adresse.pays}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>Aucune adresse trouvée.</p>
                                            )}
                                            <button onClick={() => setModalIsOpen(true)} className="paramettre"> Ajouter une adresse </button>
                                            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                                                <h2>Ajouter une nouvelle adresse</h2>
                                                <form onSubmit={handleNewAdresseSubmit}>
                                                    <div className="form-group">
                                                        <label className="paramettre">Pays</label>
                                                        <input
                                                            type="text"
                                                            className="paramettre"
                                                            name="pays"
                                                            onChange={handleNewAdresse}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="paramettre">Ville</label>
                                                        <input
                                                            type="text"
                                                            className="paramettre"
                                                            name="ville"
                                                            onChange={handleNewAdresse}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="paramettre">Code Postal</label>
                                                        <input
                                                            type="text"
                                                            className="paramettre"
                                                            name="codePostal"
                                                            onChange={handleNewAdresse}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                    <label className="paramettre">Rue</label>
                                                    <input
                                                        type="text"
                                                        className="paramettre"
                                                        name="rue"
                                                        onChange={handleNewAdresse}
                                                    />
                                                    </div>
                                                    <button type="submit" className="paramettre">Ajouter</button>
                                                    <button type="button" className="paramettre" onClick={() => setModalIsOpen(false)}>Annuler</button>
                                                </form>
                                            </Modal>
                                            
                                        </div>
                                    </div>
                                )}
                                
                                
                                {activeTab === 'tab4' && (
                                    <div className="tab-pane fade active show" id="tab4">
                                        {/* <div className="card-body pb-2"> */}
                                        <div className="paramettre-mt">
                                            <div className="form-group">
                                                <label className="paramettre">Modes de paiement enregistrés</label>
                                                <input type="password" className="paramettre"/>
                                            </div>
                                            <button type="submit" className="paramettre"> Ajouter un mode de paiement </button>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'tab5' && (
                                    <div className="tab-pane fade active show" id="tab5">
                                        {/* <div className="card-body pb-2"> */}
                                        <div className="paramettre-mt">
                                            {!showConfirmation && (
                                                <div className="confirmation-modal">
                                                        <button onClick={() => setShowConfirmation(true)} className="paramettre"> Supprimer </button>
                                                </div>
                                            )}

                                            {showConfirmation && (
                                                <div className="confirmation-modal">
                                                    <p className="danger">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                                                    <button onClick={handleDeleteAccount} className="paramettre">Oui, supprimer mon compte</button>
                                                    <button onClick={() => setShowConfirmation(false)} className="paramettre">Annuler</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Parametres;
