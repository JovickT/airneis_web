import  canape  from "../img/canape.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const Categorie = () =>{

    interface Cat {
        categorie: {
            id_cat: number,
            nom: string
        },
        date_creation: string,
        description: string,
        marque: Object,
        nom: string,
        prix: number,
        quantite: number,
        reference:string
    }

    const [prod,setProd] = useState<Cat[]>([]);

    const [searchParams] = useSearchParams();
    const catValue = searchParams.get('categories');

    useEffect(() => {

        // Vérifier si le paramètre `cat` existe et n'est pas vide
        if (catValue && catValue.length > 0) {
            // 2. Construire l'URL pour l'API
            const apiUrl = `https://localhost:8000/categories?prodofCat=${encodeURIComponent(catValue)}`;

            // 3. Utiliser `fetch` pour envoyer la requête à l'API
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setProd(data);
                    console.log('Data:', data);
                    // Traiter les données reçues de l'API ici
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            console.log('No test parameter in URL');
        }
    }, [catValue]);

    return(
        <Layout>
            <div className=" text-center">
                <span className="font-bolder fs-1 text-light position-absolute z-3 reglage">{catValue}</span>
                <img src={cascade} alt="canape" className="mb-5 carrousel-size"/>
                <p className="font-bolder">DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
                <div className="row justify-content-center">
                {prod.map((p, index) => (
                <div key={index} className="col-3 mx-3">
                    <Link to={`/produits?categories=${encodeURIComponent(p.categorie.nom)}&produits=${encodeURIComponent(p.nom)}`}>
                        <img src={canape} alt="produit" className="img-produit mb-3" />
                    </Link>
                    <div className="d-flex justify-content-between">
                        <p>{p.nom}</p>
                        <p>{p.prix}€</p>
                    </div>
                    <div className="text-end moving-up">
                        {p.quantite <= 10? <p>Stock bientôt épuisé</p>:<p>En stock</p>}
                    </div>
                </div>
                ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categorie;