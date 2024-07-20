import React, { useEffect, useState } from 'react';

interface RechercheProps {
    show: boolean;
    handleClose: () => void;
}

interface Materieaux{
    nom: string,
    id_materieaux: number,
}
interface Categories{
    nom: string,
    id_categorie: number,
}




const Recherche: React.FC<RechercheProps> = ({ show, handleClose }) => {
    const [nomProduit, setNomProduit] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [materieaux, setMaterieaux] = useState<Materieaux[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
    fetch('https://localhost:8000/filtre')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMaterieaux(data.Materiaux);
                setCategories(data.categorie);

            })
            .catch(error => console.error('Erreur lors de la récupération des données depuis le backend :', error));
            
    }, []); 

    const handleMaterialChange = (material: Materieaux) => {
       console.log('test material:',material);
       
    };

    const handleSearch = () => {
        // Logic to handle search with the provided filters
        console.log({
            nomProduit,
            minPrice,
            maxPrice,
            materieaux,
            inStock,
        });
    }

    if (!show) {
        return null;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        const stock = form.elements.namedItem('stock') as HTMLInputElement | null;

        let tab = [];
        for (let i = 0; i < materieaux.length; i++) {
            const test = form.elements.namedItem('mat_'+i) as HTMLInputElement | null;
            if (test && test.checked) {
                tab.push(test.id); // Assurez-vous d'ajouter la valeur ou l'objet nécessaire
            }
        }
        if(stock && tab.length > 0){
            const formData = {
                stock: stock.checked,
                materiaux: tab
            };

            console.log("formData:",formData,"\nform:",form);
        }
      

        
    }

    return (
        <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="recherche-header">
                                <div className="header-buttons">
                                    <button type="button" className="btn btn-secondary" onClick={() => { setNomProduit(''); setMinPrice(''); setMaxPrice(''); setMaterieaux([]); setInStock(false); }}>Réinitialiser</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Fermer</button>
                                </div>
                            </div>

                            <div className="nom-filter">
                                <label htmlFor="nomProduit">Nom du produit</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nomProduit" 
                                    value={nomProduit} 
                                    onChange={(e) => setNomProduit(e.target.value)} 
                                />
                            </div>
                    
                    
                            <div className="form-group">
                                <div className="price-filters">
                                    <div className="price-filter">
                                        <label htmlFor="minPrice">Prix min €</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="minPrice" 
                                            value={minPrice} 
                                            onChange={(e) => setMinPrice(e.target.value)} 
                                        />
                                    </div>
                                    <div className="price-filter">
                                        <label htmlFor="maxPrice">Prix max €</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="maxPrice" 
                                            value={maxPrice} 
                                            onChange={(e) => setMaxPrice(e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Matériaux</label>
                                {materieaux && materieaux.map((mat, index) => (
                                    <div className="form-check" key={index}>
                                        <input 
                                            type="checkbox" 
                                            name={'mat_'+index}
                                            className="form-check-input" 
                                            id={mat.nom}
                                        />
                                        <label className="form-check-label" htmlFor={mat.nom}>{mat.nom}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="form-group form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="inStock" 
                                    name="stock"
                                    checked={inStock} 
                                    onChange={(e) => setInStock(e.target.checked)} 
                                />
                                <label className="form-check-label"  htmlFor="inStock">En stock</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Rechercher</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recherche;
