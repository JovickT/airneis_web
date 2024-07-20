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
        // Autres propriétés si nécessaire
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
        // Autres propriétés si nécessaire
    }
    

    const imgcarrousel = [
        'un',
        'deux',
        'trois'
    ]

    const [cat, setCat] = useState<Cat[]>([]);
    const [prod, setProd] = useState<Prod[]>([]);
    const [carrousel,setCarrousel] = useState(imgcarrousel);

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
                <div className="carousel-inner">
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
                {cat && cat.length > 0 && cat.map((c, index) => (
                    <Link key={index} to={`/categorie?categories=${encodeURIComponent(c.nom)}`} className="txt-img-accueil row col-12 col-md-6 col-lg-3">
                        <img src={c.images} alt="" className="img-accueil"/>
                        <span className="font-bolder">{c.nom}</span>
                    </Link>
                ))}
            </div>
            
            <h1 className="titre">Les Highlanders du moment</h1>
            <div className="container-img-accueil">
                {prod.map((p, index) => {
                    // const imageProd = imagesProd.find(img => img.produit === p.nom);
                    // const imageSrc = imageProd ? `${imageProd.images[0]}` : canape;

                    return (
                        <div key={index} className="txt-img-accueil row col-12 col-md-6 col-lg-3">
                            <Link to={`/produits?categories=${encodeURIComponent(p.categorie)}&produits=${encodeURIComponent(p.nom)}`}>
                                <img src={p.images} alt={p.nom} className="img-produit mb-3 img-accueil"/>
                            </Link>
                            <div className="d-flex justify-content-between">
                                <p>{p.nom}</p>
                                <p>{p.prix}€</p>
                            </div>
                            <div className="text-end moving-up">
                                {p.quantite <= 10 ? <p>Stock bientôt épuisé</p> : <p>En stock</p>}
                            </div>
                        </div>
                    );
                })}
            </div>


        </Layout>
    )
}

export default Home;