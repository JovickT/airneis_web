import  canape  from "../img/canape.jpg";
import  lit  from "../img/lit.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';

const Home = () =>{

    interface Cat {
        nom: string,
        images: string
    }
    
    interface Prod {
        categorie: string,
        date_creation: Date,
        description: string,
        marque: string,
        nom: string,
        prix: number,
        quantite: number,
        reference: string,
        images: string
    }
    
    const imgcarrousel = [
        'un',
        'deux',
        'trois'
    ]

    const [cat, setCat] = useState<Cat[]>([]);
    const [prod, setProd] = useState<Prod[]>([]);
    const [carrousel,setCarrousel] = useState(imgcarrousel);

    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);

    useEffect(() => {

        const randomize = (tab: []) =>{
            var i, j, tmp;
            for (i = tab.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = tab[i];
                tab[i] = tab[j];
                tab[j] = tmp;
            }
            return tab;
        }

        // Appel à votre endpoint Symfony pour récupérer les catégories, produits et images de carrousel
        fetch('https://localhost:8000/data')
            .then(response => response.json())
            .then(data => {
                var melanger = randomize(data.produit);
                setCat(data.categorie);
                setProd(melanger);
                // setCarouselImages(data.carouselImages);
                console.log('data:',data);
            })
            .catch(error => console.error('Erreur lors de la récupération des données depuis le backend :', error));
    }, []); 

    const handleToggleCats = () => {
        setShowAllCats(!showAllCats);
    };
    const displayedCats = showAllCats ? cat : cat.slice(0, 5);

    const handleToggleProducts = () => {
        setShowAllProducts(!showAllProducts);
    };
    const displayedProducts = showAllProducts ? prod : prod.slice(0, 5);    

    return(
        <Layout>
            <div className="d-flex justify-content-center">
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
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
                    <div className="carousel-inner carousel-top">
                        {carrousel.map((img,index) =><div key={index} 
                        className={index === 0 ? "carousel-item active" : "carousel-item"}
                        data-bs-interval="5000">
                            <img src={cascade} className="d-block w-100" alt="carrousel"/>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            
            <h1 className="titre">VENANT DES HAUTE TERRE D'ÉCOSSE <br/> NOS MEUBLES SONT IMMORTELS</h1>
            <div className="container-img-accueil">
                {cat && cat.length > 0 && displayedCats.map((c, index) => (
                    <Link key={index} to={`/categorie?categories=${encodeURIComponent(c.nom)}`} className="txt-img-accueil row col-12 col-md-6 col-lg-3">
                        <img src={c.images} alt="" className="img-accueil"/>
                        <span className="font-bolder">{c.nom}</span>
                    </Link>
                ))}
                {cat.length > 5 && (
                    <button onClick={handleToggleCats} className="btn-see-more">
                        {showAllCats ? 'Voir moins' : 'Voir plus'}
                    </button>
                )}
            </div>
            
            <h1 className="titre">Les Highlanders du moment</h1>
            <div className="container-img-accueil">
                {displayedProducts.map((p, index) => (
                    <div key={index} className="txt-img-accueil row col-12 col-md-6 col-lg-3">
                        <Link to={`/produits?categories=${encodeURIComponent(p.categorie)}&produits=${encodeURIComponent(p.nom)}`}>
                            <img src={p.images} alt={p.nom} className="img-produit mb-3 img-accueil" />
                        </Link>
                        <div className="d-flex justify-content-between">
                            <p>{p.nom}</p>
                            <p>{p.prix}€</p>
                        </div>
                        <div className="text-end moving-up">
                            {p.quantite <= 10 ? <p>Stock bientôt épuisé</p> : <p>En stock</p>}
                        </div>
                    </div>
                ))}
                {prod.length > 5 && (
                    <button onClick={handleToggleProducts} className="btn-see-more">
                        {showAllProducts ? 'Voir moins' : 'Voir plus'}
                    </button>
                )}
            </div>

        </Layout>
    )
}

export default Home;