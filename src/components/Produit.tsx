import Layout from "./Layout"
import  cascade  from "../img/bannierejpg.jpg";
import  lit  from "../img/lit.jpg";
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
                        <div id="carouselExampleAutoplaying" className="carousel slide col-6" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {carrousel.map((img,index) =><div key={index} className="carousel-item active" data-bs-interval="5000">
                                    <img src={lit} className="d-block w-100" alt="..."/>
                                </div>
                                )}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="col desc-produits">
                            <div className="d-flex justify-content-between mb-3">
                                <span>{produitPage.prix}€</span>
                                <span className="text-uppercase">{produitPage.nom}</span>
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
                                {prod.map((p,index) =><div key={index} className="card me-5 my-3" >
                                    <img className="card-img-top" src={lit} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{p}</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <Link to={`/${encodeURIComponent(imgcarrousel[index])}/${encodeURIComponent(p)}`}>
                                            <button>en savoir plus</button>
                                        </Link>
                                    </div>
                                </div>
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