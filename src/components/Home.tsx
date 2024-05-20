import  img1  from "../img/caroussel1.jpg";
import  img2  from "../img/caroussel2.jpg";
import  img3  from "../img/carousel3.jpg";

//import  armoire  from "../img/armoire.jpg";
import  canape  from "../img/canape.jpg";
import  lit  from "../img/lit.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () =>{

    interface Cat {
        nom: string;
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
        const getCookie = (name: any) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop()?.split(';').shift(); // Utilisation de l'opérateur de coalescence nulle (nullish coalescing operator) pour éviter l'erreur si parts.pop() est undefined
                return cookieValue;
            }
            return undefined;
        }
        // Appel à votre endpoint Symfony pour récupérer les catégories, produits et images de carrousel
        fetch('https://localhost:8000/api/data')
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
            
            <div className="text-center mt-4 ">
                <span className="font-bolder">
                    VENANT DES HAUTE TERRE D'ÉCOSSE <br/> NOS MEUBLES SONT IMMORTELS
                </span>
            </div>
            <div className="row justify-content-center my-5 color-background">
                {cat && cat.length > 0 && cat.map((c, index) => (
                    <a key={index} href={`/${encodeURIComponent(c.nom)}`} className="row text-center col-3 my-3">
                        <img src={canape} alt="" className=" mb-2 rounded-5"/>
                        <span className="font-bolder">{c.nom}</span>
                    </a>
                ))}
            </div>
            <h1 className="text-center text-color">Les Highlanders du moment</h1>
            <div className="row justify-content-center text-center align-items-center my-5 color-background">
                {prod && prod.length > 0 && prod.map((p, index) => (
                    cat[index] && (
                        <Link key={index} to={`/${encodeURIComponent(cat[index].nom)}/${encodeURIComponent(p.nom)}`} className="row text-center col-2 my-3 mx-3">
                            <img src={canape} alt="" className=" mb-2 rounded-5"/>
                            <span className="font-bolder">{p.nom}</span>
                        </Link>
                    )
                ))}
            </div>

        </Layout>
    )
}

export default Home;