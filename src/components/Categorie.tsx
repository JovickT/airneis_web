import  canape  from "../img/canape.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { useState } from "react";

const Categorie = () =>{
    const [displayStock, setDisplayStock] = useState(false);
    const produit ={
        'armoire anglaire': ['armoire',10],
        'armoire allemande': ['armoire',12],
        'armoire suédoise': ['armoire',15]
    };

    const [prod,setProd] = useState(produit);

    return(
        <Layout>
            <div className=" text-center">
                <span className="font-bolder fs-1 text-light position-absolute z-3 reglage">Catégorie</span>
                <img src={cascade} alt="canape" className="mb-5 carrousel-size"/>
                <p className="font-bolder">DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
                <div className="row justify-content-center">
                {Object.entries(prod).map(([nomProduit, prix], index) => (
                <div key={index} className="col-3 mx-3">
                    <Link to={`/${encodeURIComponent(prix[0])}/${encodeURIComponent(nomProduit)}`}>
                        <img src={canape} alt="produit" className="img-produit mb-3" />
                    </Link>
                    <div className="d-flex justify-content-between">
                    <p>{nomProduit}</p>
                    {displayStock && <p>Stock bientôt épuisé</p>}
                    <p>{prix[1]}</p>
                    </div>
                </div>
                ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categorie;