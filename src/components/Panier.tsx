import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Layout from "./Layout"
import lit from "../img/lit.jpg"

const Panier = () =>{
    
    //permet d'avoir l'état du panier et le mettre à jour
    const [add, setAdd] = useState<{ nom: string; prix: number; description: string; quantite: number,image:string}[]>(() => {
        // Récupérer le contenu du panier depuis le localStorage
        const panierString = localStorage.getItem('panier');
        // Si le panier existe, le parser et le retourner. Sinon, retourner un tableau vide.
        return panierString ? JSON.parse(panierString) : [];
    });

    const [total, setTotal] = useState(() =>{
        localStorage.getItem('panier');
        let get = localStorage.getItem('panier') ;
        //const resultat = get ? JSON.parse(get) : [];
        var t = 0;
        add.forEach((res: any) => {
            t += (res.prix)*res.quantite;
        });
        return t;
    });

    const handleQuantityChange = (index: number, newQuantity: number) => {
        const updatedAdd = add.map((item, i) =>
            i === index ? { ...item, quantite: newQuantity } : item
        );
        setAdd(updatedAdd);
        localStorage.setItem('panier', JSON.stringify(updatedAdd));
        const newTotal = updatedAdd.reduce((acc, curr) => acc + curr.prix * curr.quantite, 0);
        setTotal(newTotal);
    };

    //pour supprimer un élément du panier
    const handleRemove = (key: number) =>{
        console.log('index:',key);
        const updatedAdd = add.filter((_, index) => index !== key);
        // Mettre à jour l'état avec le nouveau tableau

        //Recalculer le total après la suppression de l'élément
        let newTotal = updatedAdd.reduce((acc, curr) => acc + curr.prix, 0);

        setAdd(updatedAdd);

        localStorage.setItem('panier', JSON.stringify(updatedAdd));

        //Mettre à jour l'état du total
        setTotal(newTotal);

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
                                <div className="d-flex justify-content-end">
                                    <img src={r.image} alt="lit" className="w-19 mx-4 "/>
                                    <div className="col-4">
                                        <span className="font-bolder">{r.nom}</span>
                                        <p>{r.description}</p>
                                    </div>
                                    <div className="d-flex flex-column mx-5">
                                        <span className="mb-3">{r.prix}€</span>
                                        <input
                                            type="number"
                                            name="quantite"
                                            id="quantite"
                                            value={r.quantite}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                            className="w-19 mb-3"
                                        />
                                        <p className="cursor"><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleRemove(index)} /></p>
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
                                    <span>{total.toFixed(2)}<i>€</i></span> 
                                    <span>{(total*0.2).toFixed(2)} <i>€</i></span>
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