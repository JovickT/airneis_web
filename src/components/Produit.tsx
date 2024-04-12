import Layout from "./Layout"
import  cascade  from "../img/bannierejpg.jpg";
import  lit  from "../img/lit.jpg";
import  armoire  from "../img/armoire.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";


const Produit = () =>{

    //permet d'avoir l'état du panier et le mettre à jour
    const [add, setAdd] = useState<{ nom: string; prix: number; description: string; }[]>(() => {

        // Récupérer le contenu du panier depuis le localStorage
        const panierString = localStorage.getItem('panier');

        // Si le panier existe, le parser et le retourner. Sinon, retourner un tableau vide.
        return panierString ? JSON.parse(panierString) : [];

    });

    //les images lié au carrousel(pour l'instant c'est juste pour avoir six image dans le carrousel)
    const imgcarrousel = [
        'un',
        'deux',
        'trois',
        'quatre',
        'cinq',
        'six'
    ]

    // les produit similaire de la catégorie 
    const produitSimilaire =[
        'armoire anglaire',
        'armoire allemande',
        'armoire suédoise',
        'armoire suédoise',
        'armoire suédoise',
        'armoire suédoise',
    ];

    // les éléments qui constitut les informations importante d'uun produit. (il manque juste le lien vers l'image qui correspond au produit)
    const produitPage ={
        'nom': 'la vache',
        'categorie': 'canapé',
        'prix': 1200,
        'description':'les chaussettes de l\'archiduchesse sont elle sèche, archi sèche' 
    }

    const [carrousel,setCarrousel] = useState(imgcarrousel);
    const [prod,setProd] = useState(produitSimilaire);
 
    const handleAddStorage = () =>{
        setAdd([...add, produitPage]); //copie le tableau add puis ajoute le nouvelle élément produitPage avec setAdd

        localStorage.setItem('panier', JSON.stringify([...add, produitPage])); //mise à jour du localStorage panier
        const affiche  = localStorage.getItem('panier'); //affiche les éléments du panier en JSON

    }

    const affiche = localStorage.getItem('panier'); //affiche les éléments du panier en JSON

    if (affiche !== null) {
        const res = JSON.parse(affiche); //affiche les éléments du panier en tant que tableau d'objet

        console.log('mon panier :', res, '\ntaille du panier :', res.length);

    } else {
        console.error('raaaaaaaah');
    }

    return(
        <Layout>

            <div>
                <img src={cascade} alt="canape" className="carrousel-size mb-5"/>
                <div className="container">
                    <div className="row">
                        <div id="carouselExampleSlidesOnly" className="carousel slide col-6" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                                {carrousel.map((img,index) =><button key={index}
                                type="button"
                                data-bs-target="#carouselExampleSlidesOnly"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index}`}
                                ></button>)}
                            </div>
                            <div className="carousel-inner">
                                {carrousel.map((img,index) =><div key={index}
                                className={index === 0 ? "carousel-item active" : "carousel-item"}
                                data-bs-interval="5000">
                                    <img src={armoire} className="d-block w-100" alt="..."/>
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="col desc-produits">
                            <div className="d-flex justify-content-between mb-3">
                                <span className="font-bolder">{produitPage.prix}€</span>
                                <div className="d-flex flex-column">
                                    <span className="text-uppercase font-bolder">{produitPage.nom}</span>
                                    <span>En stock</span>
                                </div>
                            </div>
                            <div className="description">
                                <p>
                                L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son<br/>
                                logiciel de navigation<br/>
                                </p>
                                <p>
                                L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son<br/>
                                logiciel de navigation<br/>
                                </p>
                                <p>
                                L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son<br/>
                                logiciel de navigation<br/>
                                </p>
                                <p>
                                L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son<br/>
                                logiciel de navigation<br/>
                                </p>
                            </div>
                            <div className="text-center">
                                <button onClick={handleAddStorage}>ATOUTER AU PANIER</button>
                            </div>
                        </div>
                        <div className="text-center text-color mt-5">
                            <h1>PRODUIT SIMILAIRE</h1>
                            <div className="row justify-content-center">
                            {prod.map((p,index) =><Link key={index} to={`/${encodeURIComponent(produitPage.categorie)}/${encodeURIComponent(p)}`} className="row text-center text-decoration-none col-3 my-3 mx-3">
                                    <img src={lit} alt="" className=" mb-2 rounded-5"/>
                                    <span className="text-dark font-bolder">{p}</span>
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