import Layout from "./Layout"
import  cascade  from "../img/bannierejpg.jpg";
import  lit  from "../img/lit.jpg";
import  armoire  from "../img/armoire.jpg";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Modal from "./Modal";


const Produit = () =>{

    interface Prod{
        categorie: {
            id_cat: number,
            nom: string
        },
        date_creation: string,
        description: string,
        marque: Object,
        images: string,
        nom: string,
        prix: number,
        quantite: number,
        reference:string
    }

    //permet d'avoir l'état du panier et le mettre à jour
    const [add, setAdd] = useState<{ nom: string; prix: number; description: string; quantite: number; image: string}[]>(() => {

        // Récupérer le contenu du panier depuis le localStorage
        const panierString = localStorage.getItem('panier');

        // Si le panier existe, le parser et le retourner. Sinon, retourner un tableau vide.
        return panierString ? JSON.parse(panierString) : [];

    });

    const [searchParams] = useSearchParams();
    const prodValue = searchParams.get('produits');
    const catValue = searchParams.get('categories');
    const [theProd,setTheProd] = useState<Prod[]>([]);
    const [produitSimilaire,setProduitSimilaire] = useState<Prod[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [lePanier, setLePanier] = useState(() => {
        const savedPanier = localStorage.getItem('panier');
        return savedPanier ? JSON.parse(savedPanier) : [];
    });

    const leUser = JSON.parse(localStorage.getItem('user') || '[]');

    useEffect(() => {

        // Vérifier si le paramètre `cat` existe et n'est pas vide
        if ((prodValue && prodValue.length > 0) && (catValue && catValue.length > 0)) {
            // 2. Construire l'URL pour l'API
            const apiUrl = `https://localhost:8000/produits?categories=${encodeURIComponent(catValue)}&produits=${encodeURIComponent(prodValue)}`;

            // 3. Utiliser `fetch` pour envoyer la requête à l'API
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setTheProd(data.theProduct);
                    setProduitSimilaire(data.similary);
                    setLoading(false); // Arrête le chargement
                    console.log('Data:', data);
                    // Traiter les données reçues de l'API ici
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            setLoading(false);
            console.log('No test parameter in URL');
        }
    }, [prodValue]);

    //les images lié au carrousel(pour l'instant c'est juste pour avoir six image dans le carrousel)
    const imgcarrousel = [
        'un',
        'deux',
        'trois',
        'quatre',
        'cinq',
        'six'
    ]


    // les éléments qui constitut les informations importante d'uun produit. (il manque juste le lien vers l'image qui correspond au produit)
    const produitPage = theProd.length > 0 ? {
        'nom': theProd[0].nom,
        'categorie': theProd[0].categorie.nom,
        'prix': theProd[0].prix,
        'description': theProd[0].description,
        'quantite': theProd[0].quantite,
        'image': theProd[0].images,
    } : {
        'nom': '',
        'categorie': '',
        'prix': 0,
        'description': '',
        'quantite': 0,
        'image': ''
    };

    const [carrousel,setCarrousel] = useState(imgcarrousel);
 
    const handleAddStorage = async() =>{

        const produitExiste = add.find(item => item.nom === produitPage.nom);
        if (produitExiste) {
            const updatedAdd = add.map(item =>
                item.nom === produitPage.nom
                    ? { ...item, quantite: item.quantite + 1 }
                    : item
            );
            setAdd(updatedAdd);
            localStorage.setItem('panier', JSON.stringify(updatedAdd));
            setShowModal(true); // Afficher la modal
        } else {
            const updatedAdd = [...add, { ...produitPage, quantite: 1 }];
            setAdd(updatedAdd);
            localStorage.setItem('panier', JSON.stringify(updatedAdd));
        }

      
    }

    useEffect(() => {
        if (add && (leUser !== undefined || leUser.length !== null)) {
          const sendPanierData = async () => {
            try {
              const encodedLePanier = encodeURIComponent(JSON.stringify(add));
              const encodedLeUser = encodeURIComponent(JSON.stringify(leUser));
    
              console.log('ajoute dans le panier dans la bdd:', encodedLePanier);
    
              const url = `https://localhost:8000/panier?test=${encodedLePanier}&user=${encodedLeUser}`;
    
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

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const affiche = localStorage.getItem('panier'); //affiche les éléments du panier en JSON

    if (affiche !== null) {
        const res = JSON.parse(affiche); //affiche les éléments du panier en tant que tableau d'objet

        console.log('mon panier :', res, '\ntaille du panier :', res.length);

    } else {
        console.error('raaaaaaaah');
    }

    return(
        // <Layout>
        //     <div>
        //         <img src={cascade} alt="canape" className="carrousel-size mb-5"/>
        //         <div className="container">
        //             <Modal show={showModal} handleClose={handleCloseModal} />
        //             <div className="row">
        //                 <div id="carouselExampleSlidesOnly" className="carousel slide col-6" data-bs-ride="carousel">
        //                 <div className="carousel-indicators">
        //                         {carrousel.map((img,index) =><button key={index}
        //                         type="button"
        //                         data-bs-target="#carouselExampleSlidesOnly"
        //                         data-bs-slide-to={index}
        //                         className={index === 0 ? "active" : ""}
        //                         aria-current={index === 0 ? "true" : undefined}
        //                         aria-label={`Slide ${index}`}
        //                         ></button>)}
        //                     </div>
        //                     <div className="carousel-inner">
        //                         {carrousel.map((img,index) =><div key={index}
        //                         className={index === 0 ? "carousel-item active" : "carousel-item"}
        //                         data-bs-interval="5000">
        //                             <img src={armoire} className="d-block w-100" alt="..."/>
        //                         </div>
        //                         )}
        //                     </div>
        //                 </div>
        //                 <div className="col desc-produits">
        //                     <div className="d-flex justify-content-between mb-3">
        //                         <span className="font-bolder">{produitPage.prix}€</span>
        //                         <div className="d-flex flex-column">
        //                             <span className="text-uppercase font-bolder">{produitPage.nom}</span>
        //                             <span className="text-end">{produitPage.quantite > 10? "En stock":"bientôt en rupture de stock"}</span>
        //                         </div>
        //                     </div>
        //                     <div className="description">
        //                         <p>{produitPage.description}</p>
        //                     </div>
        //                     <div className="text-center">
        //                         <button className="produit-button" onClick={handleAddStorage}>ATOUTER AU PANIER</button>
        //                     </div>
        //                 </div>
        //                 <div className="text-center text-color mt-5">
        //                     <h1>PRODUIT SIMILAIRE</h1>
        //                     <div className="row justify-content-center">
        //                     {produitSimilaire.map((p,index) =><Link key={index} to={`/produits?categories=${encodeURIComponent(produitPage.categorie)}&produits=${encodeURIComponent(p.nom)}`} className="row text-center text-decoration-none col-3 my-3 mx-3">
        //                             <img src={lit} alt="" className=" mb-2 rounded-5"/>
        //                             <span className="text-dark font-bolder">{p.nom}</span>
        //                         </Link>
        //                     )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
               
        //     </div>
        // </Layout>
        <Layout>
        <div>
            <img src={cascade} alt="canape" className="carrousel-size mb-5" />
            <div className="container">
                <Modal show={showModal} handleClose={handleCloseModal} />
                <div className="row">
                    <div id="carouselExampleSlidesOnly" className="carousel slide col-12 col-md-6" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {carrousel.map((img, index) => <button key={index}
                                type="button"
                                data-bs-target="#carouselExampleSlidesOnly"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index}`}
                            ></button>)}
                        </div>
                        <div className="carousel-inner">
                            {carrousel.map((img, index) => <div key={index}
                                className={index === 0 ? "carousel-item active" : "carousel-item"}
                                data-bs-interval="5000">
                                <img src={armoire} className="d-block w-100" alt="..." />
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 desc-produits">
                        <div className="product-info">
                            <div className="d-flex justify-content-between mb-3">
                                <span className="font-bolder">{produitPage.prix}€</span>
                                <div className="d-flex flex-column">
                                    <span className="text-uppercase font-bolder">{produitPage.nom}</span>
                                    <span className="text-end">{produitPage.quantite > 10 ? "En stock" : "bientôt en rupture de stock"}</span>
                                </div>
                            </div>
                            <div className="description">
                                <p>{produitPage.description}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="produit-button" onClick={handleAddStorage}>AJOUTER AU PANIER</button>
                        </div>
                    </div>
                    <div className="text-center text-color mt-5">
                        <h1>PRODUIT SIMILAIRE</h1>
                        <div className="row justify-content-center produits-similaires">
                            {produitSimilaire.map((p, index) => <Link key={index} to={`/produits?categories=${encodeURIComponent(produitPage.categorie)}&produits=${encodeURIComponent(p.nom)}`} className="row text-center text-decoration-none col-3 my-3 produit-similaire-item">
                                <img src={p.images} alt="" className="mb-2 rounded-5" />
                                <span className="text-dark font-bolder">{p.nom}</span>
                            </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default Produit;