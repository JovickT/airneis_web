import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RechercheProps {
    show: boolean;
    handleClose: () => void;
}

interface Materieaux{
    nom: string,
    id_materieaux: number,
}
interface Catégories{
    nom: string,
    id_catégories: number,
}

const Recherche: React.FC<RechercheProps> = ({ show, handleClose }) => {
    const [nomProduit, setNomProduit] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [materieaux, setMaterieaux] = useState<Materieaux[]>([]);
    const [catégories, setCatégories] = useState<Catégories[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
    fetch('https://localhost:8000/filtre')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMaterieaux(data.Materiaux);
                setCatégories(data.Catégorie);

            })
            .catch(error => console.error('Erreur lors de la récupération des données depuis le backend :', error));
            
    }, []); 

    const handleMaterialChange = (material: Materieaux) => {
       console.log('test material:',material);
       
    };

    if (!show) {
        return null;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const form = e.currentTarget;
        const stock = form.elements.namedItem('stock') as HTMLInputElement | null;
        const maxPrice = form.elements.namedItem('maxPrice') as HTMLInputElement | null;
        const minPrice = form.elements.namedItem('minPrice') as HTMLInputElement | null;
        const nameProduct = form.elements.namedItem('nameProduct') as HTMLInputElement | null;
        
        
        let selectedMaterials = [];
        for (let i = 0; i < materieaux.length; i++) {
            const test = form.elements.namedItem('mat_'+i) as HTMLInputElement | null;
            if (test && test.checked) {
                selectedMaterials.push(test.id);
            }
        }

        let selectedCategories = [];
        for (let i = 0; i < catégories.length; i++) {
            const categoryCheckbox = form.elements.namedItem('cat_' + i) as HTMLInputElement | null;
            if (categoryCheckbox && categoryCheckbox.checked) {
                selectedCategories.push(categoryCheckbox.id);
            }
        }

        if(stock || selectedMaterials.length > 0 || selectedCategories.length > 0 || nameProduct || maxPrice || minPrice){
            const formData = {
                stock: stock?.checked,
                materiaux: selectedMaterials,
                categories: selectedCategories,
                nameProduct: nameProduct ? nameProduct.value : '',
                maxPrice: maxPrice && maxPrice.value !== '' ? maxPrice.value : '1000000',  // Mettre une valeur par défaut pour ne pas avoir de problème lors de l'envoie
                minPrice: minPrice && minPrice.value !== '' ? minPrice.value : '0',  // Mettre une valeur par défaut pour ne pas avoir de problème lors de l'envoie
            };

            console.log("formData:",formData,"\nform:",form);


            fetch('https://localhost:8000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                navigate('/resultatRecherche', { state: { results: data } });
            })
            .catch(error => console.error('Erreur lors de la requête de recherche :', error));
            
        }
    }
    
    return (
        <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog bord-recherche" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="recherche-header">
                                <div className="header-buttons">
                                    <button type="button" className="recherche-button" onClick={() => { setNomProduit(''); setMinPrice(''); setMaxPrice(''); setInStock(false); }}>Réinitialiser</button>
                                    <button type="button" className="recherche-button" onClick={handleClose}>Fermer</button>
                                </div>
                            </div>
                            <div className="nom-filter">
                                <label className="recherche-label" htmlFor="nomProduit">Nom du produit</label>
                                <input 
                                    type="text" 
                                    className="recherche-input" 
                                    name="nameProduct"
                                    id="nomProduit" 
                                    value={nomProduit} 
                                    onChange={(e) => setNomProduit(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <div className="price-filters">
                                    <div className="price-filter">
                                        <label className="recherche-label" htmlFor="minPrice">Prix min €</label>
                                        <input 
                                            type="number" 
                                            className="recherche-input" 
                                            name="minPrice"
                                            id="minPrice" 
                                            value={minPrice} 
                                            onChange={(e) => setMinPrice(e.target.value)} 
                                        />
                                    </div>
                                    <div className="price-filter">
                                        <label className="recherche-label" htmlFor="maxPrice">Prix max €</label>
                                        <input 
                                            type="number" 
                                            className="recherche-input" 
                                            name="maxPrice"
                                            id="maxPrice" 
                                            value={maxPrice} 
                                            onChange={(e) => setMaxPrice(e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="recherche-label">Matériaux</label>
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
                            <div className="form-group">
                                <label className="recherche-label">Catégorie</label>
                                {catégories && catégories.map((cat, index) => (
                                    <div className="form-check" key={index}>
                                        <input 
                                            type="checkbox" 
                                            name={'cat_'+index}
                                            className="form-check-input" 
                                            id={cat.nom}
                                        />
                                        <label className="form-check-label" htmlFor={cat.nom}>{cat.nom}</label>
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
                            <button type="submit" className="recherche-button">Rechercher</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recherche;

