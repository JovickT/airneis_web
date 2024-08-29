import Layout from "./Layout";
import  canape  from "../img/canape.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../services/Axios";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";


// Définition du type pour une commande
interface Commande {
  reference: string,
  date_commande: string,
  ttc: number,
  tva: number,
  etat: string,
  panier: {
    nom: string,
    prix: number,
    quantite: number,
    image: string[],
    description: string,
    categorie: string, 
  }[],
  adresse: {
    nom: string,
    prenom: string,
    rue: string,
    cp: string,
    ville: string,
    pays: string,
    telephone: string
  },

}

const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX');


const CommandeDetails = () => {
  
  const [detailCommande, setDetail] = useState<Commande | null>(null);
  const location = useLocation();
  const [paymentMethods, setPaymentMethods] = useState({
    "id": "",
    "brand": "",
    "last4": "",
    "exp_month": "",
    "exp_year": ""
  });

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messages, setMessages] = useState(false);
  const navigation = useNavigate();

  const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email : null;

  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);


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

  const iconClass = cardBrandIcons[paymentMethods.brand as CardBrand] || cardBrandIcons.default;

  useEffect(() => {
    if (location.state && location.state.commande) {
      setDetail(location.state.commande);
    }
  }, [location.state]);

  console.log('detailCommande:',detailCommande);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll && detailCommande!== null) {
      setSelectedProducts(detailCommande.panier.map((produit) => produit.nom));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleCheckboxChange = (productName: any) => {
    if (selectedProducts.includes(productName)) {
      setSelectedProducts(selectedProducts.filter((name) => name !== productName));
    } else {
      setSelectedProducts([...selectedProducts, productName]);
    }

    console.log('handleCheckboxChange selectedProducts:', selectedProducts);
    
  };

  const handleConfirmRemove = async () => {
    if (selectedProductIndex !== null) {
      try {
        const produit = detailCommande?.panier[selectedProductIndex];
  
        if (produit && detailCommande?.etat === 'En cours') {
          const response = await axios.post('/return', {
            reference: detailCommande.reference,
            articles: produit, // Assurez-vous d'envoyer l'ID ou autre identifiant unique du produit
            email: userStorage
          });
  
          const newPanier = [...detailCommande.panier];
          newPanier.splice(selectedProductIndex, 1);
  
          setDetail((prevDetailCommande) => {
            if (!prevDetailCommande) return null;
          
            const newPanier = [...prevDetailCommande.panier];
            newPanier.splice(selectedProductIndex, 1);
          
            return {
              ...prevDetailCommande,
              panier: newPanier
            };
          });

          if (response.status < 200 || response.status >= 300) {
            throw new Error('Network response was not ok');
          }

          // Les données sont disponibles directement dans response.data
          const data = response.data;
          setMessages(data);
          console.log('remove:',data);
          // navigation('/mesCommandes');
            
          }
      } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
      } finally {
        setModalRemoveIsOpen(false);
        setSelectedProductIndex(null);
      }
    }
  };
  

  const handleOpenRemoveModal = (index: number) => {
    setSelectedProductIndex(index);
    setModalRemoveIsOpen(true);
  };

  const fetchGetPaymentMethods = async () => {
      // Fetch des moyens de paiement depuis l'API
      try {
        
        const response = await axios.post('/get-payment-methods-commande', { reference: detailCommande?.reference });

        if (response.status < 200 || response.status >= 300) {
            throw new Error('Network response was not ok');
        }
  
        // Les données sont disponibles directement dans response.data
        const data = response.data;
        console.log('get payement:',data);
        setPaymentMethods(data);
      }catch (e) {
        //message d'erreur à afficher
      }
     
  }

  useEffect(() => {
      fetchGetPaymentMethods();
  }, [detailCommande?.reference]);

  const handleRetour = () =>{
    setModalIsOpen(true);
  }

  const handleConfirmRetour = async () => {
    // Fermer la modale
    setModalIsOpen(false);

    // Récupérer les informations des articles sélectionnés
    if( detailCommande !== null){
      const selectedItems = detailCommande.panier.filter((produit) =>
        selectedProducts.includes(produit.nom)
      );

      // Envoyer les informations sélectionnées au backend
      // Vous pouvez utiliser fetch ou axios pour envoyer la requête
      try {
          
        const response = await axios.post('/return', { reference: detailCommande.reference, articles: selectedItems, email: userStorage, retour: true});

        if (response.status < 200 || response.status >= 300) {
            throw new Error('Network response was not ok');
        }

        // Les données sont disponibles directement dans response.data
        const data = response.data;
        setMessages(data);
        console.log('retour:',data);
        navigation('/mesCommandes');
      }catch (e) {
        //message d'erreur à afficher
      }
      // Votre logique pour envoyer les données au backend
        console.log("Articles sélectionnés:", selectedItems);
      }

   
  };

  const handleCancelRetour = () => {
    // Fermer la modale sans rien faire
    setModalIsOpen(false);
  };
  
  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            {detailCommande !== null && (
              <h1 className="text-color font-bolder mb-5">
                Commande #{detailCommande.reference} - {detailCommande.date_commande} - {detailCommande.etat}
              </h1>
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex justify-content-around">
                {messages && <div className="alert alert-success my-4">{messages}</div>}
                <h2>Produits</h2>
                <div>
                  <label htmlFor="selectAll" className="me-3"> Sélectionner tout</label>
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>
              </div>
              {detailCommande?.panier.map((produit, index) => (
                <div key={produit.nom} className="d-flex" style={{ flexDirection: 'row', display: 'flex' }}>
                  <img src={produit.image[0]} alt="" className="mb-2 rounded-5" height="35%" width="35%" style={{ marginRight: '4%' }} />
                  <div className="ml-3" style={{ textAlign: 'left' }}>
                    <div><strong>{produit.nom}</strong></div>
                    <div>{produit.description}</div>
                    <div className="text-end mt-5">
                      <label htmlFor="" className="me-3">Sélection retour</label>
                      <input
                        type="checkbox"
                        name={produit.nom}
                        checked={selectedProducts.includes(produit.nom)}
                        onChange={() => handleCheckboxChange(produit.nom)}
                      />
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <div>{produit.prix}€</div>
                    <div><input type="number" id="tentacles" value={produit.quantite} style={{ width: "50px" }} className="commande-nombre" readOnly /></div>
                    <p className="cursor mt-3">
                      <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleOpenRemoveModal(index)} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <h2>Total</h2>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {detailCommande?.ttc.toFixed(2)}€
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      TVA
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {detailCommande?.tva.toFixed(2)}€
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <h3>Adresse de livraison</h3>
              {detailCommande?.adresse && (
                <div>
                  <p>{detailCommande.adresse.nom} {detailCommande.adresse.prenom}<br />
                    {detailCommande.adresse.rue}<br />
                    {detailCommande.adresse.cp} {detailCommande.adresse.ville}<br />
                    {detailCommande.adresse.pays}<br />
                    {detailCommande.adresse.telephone}
                  </p>
                </div>
              )}
              <hr />
              <h3>Adresse de facturation</h3>
              {detailCommande?.adresse && (
                <div>
                  <p>{detailCommande.adresse.nom} {detailCommande.adresse.prenom}<br />
                    {detailCommande.adresse.rue}<br />
                    {detailCommande.adresse.cp} {detailCommande.adresse.ville}<br />
                    {detailCommande.adresse.pays}<br />
                    {detailCommande.adresse.telephone}
                  </p>
                </div>
              )}
              <hr />
              <h3>Méthode de paiement</h3>
              <Elements stripe={stripePromise}>
                <div key={paymentMethods.id} className="payment-method d-flex align-items-center mt-4">
                  <i className={`${iconClass} fa-2x me-2`}></i>
                  <p className="mb-0">
                    **** **** **** {paymentMethods.last4} <span>{paymentMethods.exp_month}/{paymentMethods.exp_year}</span>
                  </p>
                </div>
              </Elements>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center ">
          <button className="btn w-50 my-4" onClick={handleRetour}  disabled={detailCommande?.etat !== 'Livré' || selectedProducts.length < 1} >Retour</button>
        </div>
      </div>

    <ConfirmationModal
      isOpen={modalIsOpen}
      onRequestClose={handleCancelRetour}
      onConfirm={handleConfirmRetour}
      onCancel={handleCancelRetour}
      title="Confirmation"
      message="Êtes-vous sûr de vouloir retourner les articles sélectionnés ?"
    />

    <ConfirmationModal
      isOpen={modalRemoveIsOpen}
      onRequestClose={() => setModalRemoveIsOpen(false)}
      onConfirm={handleConfirmRemove}
      onCancel={() => setModalRemoveIsOpen(false)}
      title="Confirmation de suppression"
      message="Êtes-vous sûr de vouloir supprimer cet article de votre commande ?"
    />
    </Layout>
  );
};

export default CommandeDetails;
