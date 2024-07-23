import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Link } from "react-router-dom";

const ResultatRecherche: React.FC = () => {
    const location = useLocation();
    const results = location.state?.results || [];
    console.log("test recherche", results);

    const [sortedResults, setSortedResults] = useState(results);
    const [sortPriceOrder, setSortPriceOrder] = useState<string | null>(null);
    const [sortDateOrder, setSortDateOrder] = useState<string | null>(null);

    const handleSortByPrice = (order: string) => {
        setSortPriceOrder(order);
        const sorted = [...results].sort((a, b) => {
            return order === 'asc' ? a.prix - b.prix : b.prix - a.prix;
        });
        setSortedResults(sorted);
    };

    const handleSortByDate = (order: string) => {
        setSortDateOrder(order);
        console.log("Sorting by date:", order);
        const sorted = [...results].sort((a, b) => {
            const dateA = new Date(a.dateCreation).getTime();
            const dateB = new Date(b.dateCreation).getTime();
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setSortedResults(sorted);
    };

    const handleReset = () => {
        setSortPriceOrder(null);
        setSortDateOrder(null);
        setSortedResults(results);
    };

    return (
        <Layout>
            <div>
                <h1 className="titre-recherche">Résultats de la recherche</h1>
                <div className="container-img-recherche">
                    <div className="sort-options reslutat-recherche-marge">
                        <div>
                            <p className='recherche-label'>Trier par prix :</p>
                            <input
                                type="radio"
                                name="sortPrice"
                                id="priceAsc"
                                checked={sortPriceOrder === 'asc'}
                                onChange={() => handleSortByPrice('asc')}
                            />
                            <label htmlFor="priceAsc">Croissant</label><br />
                            <input
                                type="radio"
                                name="sortPrice"
                                id="priceDesc"
                                checked={sortPriceOrder === 'desc'}
                                onChange={() => handleSortByPrice('desc')}
                            />
                            <label htmlFor="priceDesc">Décroissant</label>
                        </div><br />
                        <div>
                            <p className='recherche-label'>Trier par date de création :</p>
                            <input
                                type="radio"
                                name="sortDate"
                                id="dateNewest"
                                checked={sortDateOrder === 'newest'}
                                onChange={() => handleSortByDate('newest')}
                            />
                            <label htmlFor="dateNewest">Récente</label><br />
                            <input
                                type="radio"
                                name="sortDate"
                                id="dateOldest"
                                checked={sortDateOrder === 'oldest'}
                                onChange={() => handleSortByDate('oldest')}
                            />
                            <label htmlFor="dateOldest">Ancienne</label>
                        </div><br></br>
                        <button onClick={handleReset} className='recherche-label'>Réinitialiser</button>

                    </div>
                
                    {sortedResults.map((result: any, index: number) => (
                        <div key={index} className="txt-img-recherche row col-12 col-md-6 col-lg-3">
                            <div>
                                <Link to={`/produits?categories=${encodeURIComponent(result.category.nom)}&produits=${encodeURIComponent(result.nom)}`} className="txt-img-recherche">
                                    <img src={result.image} alt={result.nom} className="img-produit mb-3 img-recherche" />
                                    <div className="d-flex justify-content-between prix-stock">
                                        <p>{result.nom}</p>
                                        <p>{result.prix}€</p>
                                    </div>
                                    <div className="text-end moving-up">
                                    {result.quantite === 0 ? (
                                        <p>Stock épuisé</p>
                                    ) : result.quantite <= 10 ? (
                                        <p>Stock bientôt épuisé</p>
                                    ) : (
                                        <p>En stock</p>
                                    )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default ResultatRecherche;
