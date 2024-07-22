// import React from 'react';
import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Link } from "react-router-dom";

const ResultatRecherche: React.FC = () => {
    const location = useLocation();
    const results = location.state?.results || [];
    console.log("test recherche",results);

    const [sortedResults, setSortedResults] = useState(results);
    const [sortOrder, setSortOrder] = useState<string | null>(null);

    const handleSortByPrice = (order: string) => {
        setSortOrder(order);
        const sorted = [...results].sort((a, b) => {
            return order === 'asc' ? a.prix - b.prix : b.prix - a.prix;
        });
        setSortedResults(sorted);
    };

    const handleSortByDate = (order: string) => {
        console.log("Sorting by date:", order);
        const sorted = [...results].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setSortedResults(sorted);
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
                                checked={sortOrder === 'asc'}
                                onChange={() => handleSortByPrice('asc')}
                            />
                            <label htmlFor="priceAsc">Croissant</label><br></br>
                            <input
                                type="radio"
                                name="sortPrice"
                                id="priceDesc"
                                checked={sortOrder === 'desc'}
                                onChange={() => handleSortByPrice('desc')}
                            />
                            <label htmlFor="priceDesc">Décroissant</label>
                        </div><br></br>
                        <div>
                            <p className='recherche-label'>Trier par date de création :</p>
                            <input
                                type="radio"
                                name="sortDate"
                                id="dateNewest"
                                checked={sortOrder === 'newest'}
                                onChange={() => handleSortByDate('newest')}
                            />
                            <label htmlFor="dateNewest">Récente</label><br></br>
                            <input
                                type="radio"
                                name="sortDate"
                                id="dateOldest"
                                checked={sortOrder === 'oldest'}
                                onChange={() => handleSortByDate('oldest')}
                            />
                            <label htmlFor="dateOldest">Ancienne</label>
                        </div>
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
