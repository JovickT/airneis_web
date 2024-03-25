import { useState } from "react";
import Layout from "./Layout"
import lit from "../img/lit.jpg"

const Panier = () =>{

    const [add, setAdd] = useState<{ nom: string; prix: number; description: string; }[]>(() => {
        // Récupérer le contenu du panier depuis le localStorage
        const panierString = localStorage.getItem('panier');
        // Si le panier existe, le parser et le retourner. Sinon, retourner un tableau vide.
        return panierString ? JSON.parse(panierString) : [];
    });

    const handleRemove = (key: number) =>{
        console.log('index:',key);
        const updatedAdd = add.filter((_, index) => index !== key);
        // Mettre à jour l'état avec le nouveau tableau
        setAdd(updatedAdd);
        localStorage.setItem('panier', JSON.stringify(updatedAdd));
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
                                <div className="d-flex">
                                    <img src={lit} alt="lit" className="w-19 mx-4 "/>
                                    <div className="col-4">
                                        <span className="font-bolder">{r.nom}</span>
                                        <p>{r.description}</p>
                                    </div>
                                    <div className="d-flex flex-column mx-5">
                                        <span className="mb-3">{r.prix}€</span>
                                        <input type="number" name="quantite" id="quantite" className="w-19 mb-2"/>
                                        <i className="fas fa-trash-alt" onClick={() => handleRemove(index)}>trash</i>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                        <div className="col mx-5">
                            <div className="mb-5">
                                <div className="d-flex justify-content-around">
                                    <span className="font-bolder">TOTAL</span>
                                    <span className="font-bolder">TVA</span>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <span>4000 <i>€</i></span> 
                                    <span>800 <i>€</i></span>
                                </div>
                            </div>
                            <div className="text-center">
                                <button>PASSER LA COMMANDE</button>
                            </div>
                        
                        </div>
                    </div>
                
            </div>
        </Layout>
    )
}

export default Panier;