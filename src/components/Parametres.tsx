import Layout from "./Layout";
import React, { useEffect, useState,ChangeEvent, FormEvent } from 'react';
import { useAuth } from "../context/AuthContext";
import '../parametres.css';
import axios from "../services/Axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


interface Adresse {
    id_adresse: number;
    pays: string;
    ville: string;
    cp: string;
    rue: string;
}

interface Payement{
    id: string;
    brand: string;
    last4: string;
    exp_month: string;
    exp_year: string;
}

interface Panier {
    email: string | null;
}

const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX');

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

    type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'diners' | 'unionpay' | 'default';

    const cardBrandIcons: Record<CardBrand, string> = {
        visa: 'fab fa-cc-visa',
        mastercard: 'fab fa-cc-mastercard',
        amex: 'fab fa-cc-amex',
        discover: 'fab fa-cc-discover',
        jcb: 'fab fa-cc-jcb',
        diners: 'fab fa-cc-diners-club',
        unionpay: 'far fa-credit-card',
        default: 'far fa-credit-card', // Icône par défaut pour les autres marques
    };
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [successMdp, setSuccessMdp] = useState(false);
    const [successAdress, setSuccessAdress] = useState(false);
    const [successInfo, setSuccessInfo] = useState(false);
    const [successPayement, setSuccessPayement] = useState(false);
    const [adresses, setAdresses] = useState<Adresse[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<Payement[]>([]);
    const [userStorage, setUserStorage] = useState<Panier>({
        email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email : null
    });
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

    const fetchGetPaymentMethods = async () => {
        // Fetch des moyens de paiement depuis l'API
        const response = await axios.post('/get-payment-methods', userStorage);

        if (response.status < 200 || response.status >= 300) {
            throw new Error('Network response was not ok');
        }

        // Les données sont disponibles directement dans response.data
        const data = response.data;
        setPaymentMethods(data.paymentMethods);
    }

    useEffect(() => {
        fetchGetPaymentMethods();
    }, []);

    const fetchAdresses = async () => {
        try {
            const response = await axios.post('/userAdresses', userStorage);
            console.log('adresses client:', response.data);
            
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
            
            const response = await axios.put('/update-user', compte);

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }
        
            // Les données sont disponibles directement dans response.data
            const data = response.data;
            setMessage(data.message);
            setSuccessInfo(true);

            checkAuthStatus(); 
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
        }
    };

    const handlePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/change-password', {
                currentPassword,
                newPassword,
                repeatNewPassword
            });
        
            // Vérifiez si le statut HTTP est dans la plage des réponses réussies (200-299)
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }
        
            // Les données sont disponibles directement dans response.data
            const data = response.data;
            setMessage(data.message);
            setSuccessMdp(true);
        
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
            await axios.post('/add-adresse', nouvelleAdresse );
            setMessage('Adresse ajoutée avec succès');
            setNouvelleAdresse({
                pays: '',
                ville: '',
                codePostal: '',
                rue: ''
            });
            setSuccessAdress(true);
            setModalIsOpen(false);
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

    const [add, setAdd] = useState(false);
    
    const handleAddPayement = async () => {
        setAdd(true);
    }

    const fetchPaiementMethods = async (paymentMethod: any) => {
        try {
            const response = await axios.post('/attach-payment-method', {
                user: {
                    email: userStorage?.email,
                },
                paymentMethodId: {
                    id: paymentMethod.id,
                    card: {
                        brand: paymentMethod.card.brand,
                        last4: paymentMethod.card.last4,
                        exp_month: paymentMethod.card.exp_month,
                        exp_year: paymentMethod.card.exp_year
                    }
                }
            });
    
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }
    
            const data = response.data;
            setSuccessPayement(true);
            console.log('Response data:', data);
        } catch (error) {
            console.error('Error attaching payment method:', error);
        }
    }

    const handlePaymentMethodAdded = (paymentMethod: any) => {
        fetchPaiementMethods(paymentMethod);
        fetchGetPaymentMethods();
       
        setAdd(false);
        window.location.reload();
    }

    const handleRemove = async(key: number) =>{
        console.log('index:',key);
        // const updatedAdd = add.filter((_, index) => index !== key);
        // // Mettre à jour l'état avec le nouveau tableau

        // //Recalculer le total après la suppression de l'élément
        // let newTotal = updatedAdd.reduce((acc, curr) => acc + curr.prix, 0);

        // setAdd(updatedAdd);

        // localStorage.setItem('panier', JSON.stringify(updatedAdd));

        // //Mettre à jour l'état du total
        // setTotal(newTotal);

    }
    
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
                                    className={`list-group-item list-group-item-action cursor ${activeTab === 'tab1' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab1')}
                                >
                                    Informations personnelles
                                </a>
                                <a 
                                    className={`list-group-item list-group-item-action cursor ${activeTab === 'tab2' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab2')}
                                >
                                    Changer le mot de passe
                                </a>
                                <a 
                                    className={`list-group-item list-group-item-action cursor ${activeTab === 'tab3' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab3')}
                                >
                                    Adresses de livraisons
                                </a>                                   
                                <a 
                                    className={`list-group-item list-group-item-action cursor ${activeTab === 'tab4' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('tab4')}
                                >
                                    Méthodes de paiement
                                </a>                                   
                                <a 
                                    className={`list-group-item list-group-item-action cursor ${activeTab === 'tab5' ? 'active' : ''}`} 
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
                                            {successInfo && <div className="alert alert-success mb-4" role="alert">Informations mises à jour</div>}
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
                                            {successMdp && <div className="alert alert-success">Mot de passe modifié avec succès.</div>}
                                            <div className="card-body pb-2">
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
                                        <div className="card-body pb-2"><br/><br/>
                                        {successAdress && <div className="alert alert-success mb-4">Adresse ajouté avec succès.</div>}
                                        <h3>Mes adresses</h3>
                                            {adresses.length > 0 ? (
                                                <ul>
                                                    {adresses.map((adresse) => (
                                                        <li key={adresse.id_adresse}>
                                                            {adresse.rue}, {adresse.cp} {adresse.ville}, {adresse.pays}
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
                                
                                <Elements stripe={stripePromise}>
                                    {activeTab === 'tab4' && (
                                        <div className="tab-pane fade active show" id="tab4">
                                            <div className="card-body pb-2">
                                                <div className="form-group"><br/><br/>
                                                    <label className="form-label">Modes de paiement enregistrés</label>
                                                    {successPayement && <div className="alert alert-success mb-4">Méthode de paiement ajouté avec succès</div>}
                                                    <div>
                                                    {paymentMethods.length > 0 ? (
                                                        paymentMethods.map((method: Payement, index: number) => {
                                                            const iconClass = cardBrandIcons[method.brand as CardBrand] || cardBrandIcons.default;
                                                            return (
                                                                <div key={method.id} className="payment-method d-flex align-items-center mb-4">
                                                                    <i className={`${iconClass} fa-2x me-2`}></i>
                                                                    <p className="mb-0">
                                                                        **** **** **** {method.last4} <span>{method.exp_month}/{method.exp_year}</span>
                                                                    </p>
                                                                    <p className="cursor mx-5 mt-3">
                                                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleRemove(index)} />
                                                                    </p>
                                                                </div>
                                                            );
                                                        })
                                                        ) : (
                                                            <p>No payment methods available.</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-3 d-flex justify-content-end">
                                                    <div className="d-flex flex-nowrap small-screen-buttons">
                                                        <button type="submit" className="paramettre" onClick={handleAddPayement}>
                                                            Ajouter un mode de paiement
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {add && (
                                                <div>
                                                    <PaymentForm onPaymentMethodAdded={handlePaymentMethodAdded} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Elements>
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
