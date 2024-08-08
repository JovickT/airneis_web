import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/Axios";

const Home = () => {
    interface Cat {
        nom: string,
        images: string
    }

    interface Prod {
        categorie: string,
        date_creation: Date,
        description: string,
        marque: string,
        nom: string,
        prix: number,
        quantite: number,
        reference: string,
        images: string
    }

    const imgcarrousel = [
        'un',
        'deux',
        'trois'
    ]

    const [userStorage, setUserStorage] = useState(() => {
        try {
          const storedUser = localStorage.getItem('user');
          return storedUser ? JSON.parse(storedUser) : [];
        } catch (e) {
          console.error('Erreur lors de la récupération ou du parsing de user depuis localStorage:', e);
          return [];
        }
    });

    const [cat, setCat] = useState<Cat[]>([]);
    const [prod, setProd] = useState<Prod[]>([]);
    const [carrousel, setCarrousel] = useState(imgcarrousel);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCatPage, setCurrentCatPage] = useState(1);

    const [lePanier, setLePanier] = useState(() => {
        const savedPanier = localStorage.getItem('panier');
        return savedPanier ? JSON.parse(savedPanier) : [];
    });

    const itemsPerPage = 3;
    const catItemsPerPage = 3;

    const majPanier = async () => {
        try {
            const response = await axios.post('/majPanier', { user: userStorage, panier: lePanier });
    
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }
    
            const data = response.data;
            setLePanier(data);
            localStorage.setItem('panier', JSON.stringify(data));
        } catch (e) {
            //message d'erreur à afficher
            console.error('Erreur lors de la mis    e à jour du panier:', e);
        }
    };

    useEffect(() =>{
       majPanier();
    }, [userStorage]);

    useEffect(() => {
        const randomize = (tab: []) => {
            var i, j, tmp;
            for (i = tab.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = tab[i];
                tab[i] = tab[j];
                tab[j] = tmp;
            }
            return tab;
        }

        fetch('https://localhost:8000/api/data')
            .then(response => response.json())
            .then(data => {
                var melanger = randomize(data.produit);
                setCat(data.categorie);
                setProd(melanger);
                console.log('data:', data);
            })
            .catch(error => console.error('Erreur lors de la récupération des données depuis le backend :', error));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prod.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(prod.length / itemsPerPage);

    const indexOfLastCatItem = currentCatPage * catItemsPerPage;
    const indexOfFirstCatItem = indexOfLastCatItem - catItemsPerPage;
    const currentCatItems = cat.slice(indexOfFirstCatItem, indexOfLastCatItem);
    const totalCatPages = Math.ceil(cat.length / catItemsPerPage);

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

    const handleCatClickNext = () => {
        if (currentCatPage < totalCatPages) {
            setCurrentCatPage(currentCatPage + 1);
        }
    };

    const handleCatClickPrev = () => {
        if (currentCatPage > 1) {
            setCurrentCatPage(currentCatPage - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCatPageClick = (pageNumber: number) => {
        setCurrentCatPage(pageNumber);
    };

    const renderPageNumbers = (current: number, total: number) => {
        const delta = 1;
        const range = [];
        for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
            range.push(i);
        }
        if (current - delta > 1) {
            range.unshift("...");
        }
        if (current + delta < total) {
            range.push("...");
        }
        return range;
    };

    return (
        <Layout>
            <div className="d-flex justify-content-center">
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {carrousel.map((img, index) => (
                            <button key={index}
                                type="button"
                                data-bs-target="#carouselExampleSlidesOnly"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {carrousel.map((img, index) => (
                            <div key={index}
                                className={index === 0 ? "carousel-item active" : "carousel-item"}
                                data-bs-interval="5000">
                                <img src={img} className="d-block w-100" alt="carrousel" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h1 className="titre">VENANT DES HAUTE TERRE D'ÉCOSSE <br /> NOS MEUBLES SONT IMMORTELS</h1>
            <div className="container-img-accueil">
                {currentCatItems.map((c, index) => (
                    <Link key={index} to={`/categorie?categories=${encodeURIComponent(c.nom)}`} className="txt-img-accueil row col-12 col-md-6 col-lg-3">
                        <img src={c.images} alt="" className="img-accueil" />
                        <span className="font-bolder">{c.nom}</span>
                    </Link>
                ))}
            </div>

            <div className="d-flex justify-content-center align-items-center mt-4 pagination-container">
                <button onClick={handleCatClickPrev} disabled={currentCatPage === 1} className="btn-see-more">Précédent</button>
                <div className="pagination">
                    {renderPageNumbers(currentCatPage, totalCatPages).map((num, index) => (
                        <button key={index}
                            onClick={() => typeof num === 'number' && handleCatPageClick(num)}
                            className={`btn-number ${num === currentCatPage ? 'btn-current' : ''}`}>
                            {num}
                        </button>
                    ))}
                </div>
                <button onClick={handleCatClickNext} disabled={currentCatPage === totalCatPages} className="btn-see-more">Suivant</button>
            </div>

            <h1 className="titre">Les Highlanders du moment</h1>
            <div className="container-img-accueil">
                {currentItems.map((p, index) => (
                    <div key={index} className="txt-img-accueil row col-12 col-md-6 col-lg-3">
                        <Link to={`/produits?categories=${encodeURIComponent(p.categorie)}&produits=${encodeURIComponent(p.nom)}`}>
                            <img src={p.images} alt={p.nom} className="img-produit mb-3 img-accueil" />
                        </Link>
                        <div className="d-flex justify-content-between">
                            <p>{p.nom}</p>
                            <p>{p.prix}€</p>
                        </div>
                        <div className="text-end moving-up">
                            {p.quantite === 0 ? <p>Épuisé</p> : p.quantite <= 10 ? <p>Stock bientôt épuisé</p> : <p>En stock</p>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center align-items-center mt-4 pagination-container">
                <button onClick={handleClickPrev} disabled={currentPage === 1} className="btn-see-more">Précédent</button>
                <div className="pagination">
                    {renderPageNumbers(currentPage, totalPages).map((num, index) => (
                        <button key={index}
                            onClick={() => typeof num === 'number' && handlePageClick(num)}
                            className={`btn-number ${num === currentPage ? 'btn-secondary' : 'btn-light'}`}>
                            {num}
                        </button>
                    ))}
                </div>
                <button onClick={handleClickNext} disabled={currentPage === totalPages} className="btn-see-more">Suivant</button>
            </div>
        </Layout>
    )
}

export default Home;
