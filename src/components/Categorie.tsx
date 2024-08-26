import  canape  from "../img/canape.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
        image: string[]
    }

    const navigate = useNavigate();
    const [prod,setProd] = useState<Cat[]>([]);
    const [baniere,setBaniere] = useState<string>();
    const [searchParams] = useSearchParams();
    const catValue = searchParams.get('categories');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {

        // Vérifier si le paramètre `cat` existe et n'est pas vide
        if (catValue && catValue.length > 0) {
            // 2. Construire l'URL pour l'API
            const apiUrlCatProd = `https://localhost:8000/api/categories?prodofCat=${encodeURIComponent(catValue)}`;

            // 3. Utiliser `fetch` pour envoyer la requête à l'API
            fetch(apiUrlCatProd)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setProd(data.produits);
                    setBaniere(data.baniere);
                    console.log('Data:', data);
                    // Traiter les données reçues de l'API ici
                })
                .catch(error => {
                    navigate('/');
                    console.error('There was a problem with the fetch operation:', error);
                });

        
        } else {
            console.log('No test parameter in URL');
        }
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prod.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(prod.length / itemsPerPage);


    const handleClickNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return(
        <Layout>
            <div className="text-center">
                <span className="font-bolder fs-1 text-light position-absolute z-4 reglage">{catValue}</span>
                <img src={baniere} alt="canape" className="mb-5 carrousel-size"/>
                <p className="font-bolder">DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
                <div className="row justify-content-center disposition-categorie">
                {currentItems.map((p, index) => {
                        // const imageProd = imagesProd.find(img => img.produit === p.nom);
                        // const imageSrc = imageProd ? `${imageProd.images[0]}` : canape;

                        return (
                            <div key={index} className="col-3 mx-3 contenu-catgorie">
                                <Link to={`/produits?categories=${encodeURIComponent(p.categorie.nom)}&produits=${encodeURIComponent(p.nom)}`}>
                                    <img src={p.image[0]} alt={p.nom} className="img-produit-categorie"/>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <p>{p.nom}</p>
                                    <p>{p.prix}€</p>
                                </div>
                                <div className="text-end moving-up test2">
                                    {p.quantite <= 10 ? <p>Stock bientôt épuisé</p> : <p>En stock</p>}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="d-flex justify-content-around mt-4">
                <button onClick={handleClickPrev} disabled={currentPage === 1} className="btn btn-primary btn-pagination">Précédent</button>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1}
                            onClick={() => handlePageClick(index + 1)}
                            className={`btn ${index + 1 === currentPage ? 'btn-secondary' : 'btn-light'}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={handleClickNext} disabled={currentPage === totalPages} className="btn btn-primary btn-pagination">Suivant</button>
            </div>
            </div>
        </Layout>
    )
}

export default Categorie;