import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from "./Layout"
import lit from "../img/lit.jpg"
import { useNavigate } from "react-router-dom";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "../services/Axios";


const Panier = () =>{
    const [message, setMessage] = useState('');

    const [lePanier, setLePanier] = useState(() => {
        const savedPanier = localStorage.getItem('panier');
        return savedPanier ? JSON.parse(savedPanier) : [];
    });

    const leUser = JSON.parse(localStorage.getItem('user') || '[]');

    const navigate = useNavigate();
    //permet d'avoir l'état du panier et le mettre à jour
    const [add, setAdd] = useState<{ nom: string; prix: number; description: string; quantite: number,image:string}[]>(() => {
        // Récupérer le contenu du panier depuis le localStorage
        const panierString = localStorage.getItem('panier');
        // Si le panier existe, le parser et le retourner. Sinon, retourner un tableau vide.
        return panierString ? JSON.parse(panierString) : [];
    });


    const [total, setTotal] = useState(() =>{
        localStorage.getItem('panier');
        let get = localStorage.getItem('panier') ;
        //const resultat = get ? JSON.parse(get) : [];
        var t = 0;
        add.forEach((res: any) => {
            t += (res.prix)*res.quantite;
        });
        return t;
    });

    // const majPanier = async () => {
    //     try {
    //         const response = await axios.post('/majPanier', { user: leUser, panier: lePanier });
    
    //         if (response.status < 200 || response.status >= 300) {
    //             throw new Error('Network response was not ok');
    //         }
    
    //         const data = response.data;
    //         setLePanier(data);
    //         localStorage.setItem('panier', JSON.stringify(data));
    //     } catch (e) {
    //         //message d'erreur à afficher
    //         console.error('Erreur lors de la mis    e à jour du panier:', e);
    //     }
    // };

    // useEffect(() =>{
    //    majPanier();
    // }, [lePanier]);

    

    const handleQuantityChange = async (index: number, newQuantity: number) => {
        const updatedAdd = add.map((item, i) =>
            i === index ? { ...item, quantite: newQuantity } : item
        );
        setAdd(updatedAdd);
        localStorage.setItem('panier', JSON.stringify(updatedAdd));
        const newTotal = updatedAdd.reduce((acc, curr) => acc + curr.prix * curr.quantite, 0);
        setTotal(newTotal);

      
    };

    
    
    //pour supprimer un élément du panier
    const handleRemove = async(key: number) =>{
        console.log('index:',key);
        const updatedAdd = add.filter((_, index) => index !== key);
        // Mettre à jour l'état avec le nouveau tableau

        //Recalculer le total après la suppression de l'élément
        let newTotal = updatedAdd.reduce((acc, curr) => acc + curr.prix, 0);

        setAdd(updatedAdd);

        localStorage.setItem('panier', JSON.stringify(updatedAdd));

        //Mettre à jour l'état du total
        setTotal(newTotal);

    }

    useEffect(() => {
        if (add && (leUser !== undefined || leUser.length !== null)) {
          const sendPanierData = async () => {
            try {
              const encodedLePanier = encodeURIComponent(JSON.stringify(add));
              const encodedLeUser = encodeURIComponent(JSON.stringify(leUser));
    
              console.log('ajoute dans le panier dans la bdd:', encodedLePanier);
    
              const url = `https://localhost:8000/api/panier?test=${encodedLePanier}&user=${encodedLeUser}`;
    
              const response = await fetch(url, {
                method: 'GET', // Utilisez POST si nécessaire
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include', // Ajoute les credentials pour envoyer les cookies
              });
    
              if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi des données au serveur');
              }
    
              const result = await response.json();
              console.log('Réponse du serveur:', result?.success);
              localStorage.setItem('panier', JSON.stringify(result?.success));
            } catch (error) {
              console.error('Erreur:', error);
            }
          };
    
          sendPanierData();
        }
      }, [add, leUser]);

    const handleCommande =() =>{
        if(lePanier.length > 0){
            const user = localStorage.getItem('user');
            const totalTTC = (total + (total * 0.2)).toFixed(2);
            localStorage.setItem('TTC', JSON.stringify(totalTTC));
            if (user) {
                navigate('/checkoutLivraison');
            } else {
                navigate('/connexion', { state: { from: '/checkoutLivraison' }}); // Remplacez '/login' par l'URL de la page que vous souhaitez rediriger si l'utilisateur n'est pas connecté
            }
        }else{
            setMessage('Votre panier est vide!');
        }
       
    }
    
    return(
        <Layout>
            <div>
                <div className="line-separator"></div>
                    <div className="text-center">
                        <h1 className="text-color font-bolder mb-5">Panier</h1>
                    </div>
                    <div className="row">
                        <div className="col">
                            {add.map((r,index) =><div key={index} className="mb-4">
                                <div className="d-flex justify-content-end">
                                    <img src={r.image[0]} alt={r.nom} className="w-19 mx-4 "/>
                                    <div className="col-4">
                                        <span className="font-bolder">{r.nom}</span>
                                        <p>{r.description}</p>
                                    </div>
                                    <div className="d-flex flex-md-column flex-row mx-5 align-items-md-center align-items-start">
                                        <span className="mb-3 panier-detail">{r.prix}€</span>
                                        <input
                                            type="number"
                                            name="quantite"
                                            id="quantite"
                                            value={r.quantite}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                            className="mb-3 panier-nombre panier-detail"
                                        />
                                        <p className="cursor">
                                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleRemove(index)} />
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        )}

                    {message.length > 0 && <div className="alert alert-warning mx-5" role="alert">
                        {message}
                    </div>}
                    </div>
                    
                    <div className="col mx-5">
                        <div className="mb-5">
                            <div className="d-flex flex-md-row flex-column justify-content-around gap-2">
                                <div className="d-flex flex-column align-items-center align-items-md-start">
                                    <span className="font-bolder">TOTAL</span>
                                    <span>{total.toFixed(2)}<i>€</i></span>
                                </div>
                                <div className="d-flex flex-column align-items-center align-items-md-start">
                                    <span className="font-bolder">TVA</span>
                                    <span>{(total*0.2).toFixed(2)} <i>€</i></span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4 mt-md-0">
                            <button className="panier-button" onClick={() => handleCommande()}>PASSER LA COMMANDE</button>
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )
}

export default Panier;