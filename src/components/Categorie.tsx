import  canape  from "../img/canape.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";
import { useState } from "react";

const Categorie = () =>{
    const [displayStock, setDisplayStock] = useState(false)
    return(
        <Layout>
            <div className=" text-center essaie">
                <span className="font-bolder fs-1 text-light">Catégorie</span>
                <img src={cascade} alt="canape" className="mb-5"/>
                <p className="font-bolder">DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
                <div className="d-flex ">
                    <div className="mx-3">
                        <img src={canape} alt="produit" className="img-produit mb-3"/>
                        <div className="d-flex justify-content-between">
                            <p>Nom du Produit</p>
                            {displayStock && <p>Stock si épuisé</p>}
                            <p>Prix du produit</p>
                        </div>
                    </div>

                    <div className="mx-3">
                        <img src={canape} alt="produit" className="img-produit mb-3"/>
                        <div className="d-flex justify-content-between">
                            <p>Nom du Produit</p>
                            {displayStock && <p>Stock si épuisé</p>}
                            <p>Prix du produit</p>
                        </div>
                    </div>

                    <div className="mx-3">
                        <img src={canape} alt="produit" className="img-produit mb-3"/>
                        <div className="d-flex justify-content-between">
                            <p>Nom du Produit</p>
                            {displayStock && <p>Stock si épuisé</p>}
                            <p>Prix du produit</p>
                        </div>
                    </div>
                </div>
                <div className="test"></div>
            </div>
        </Layout>
    )
}

export default Categorie;