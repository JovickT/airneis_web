import Layout from "./Layout"
import  cascade  from "../img/bannierejpg.jpg";
import  lit  from "../img/lit.jpg";
import  armoire  from "../img/armoire.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "./Modal";


const Produit = () => {

    interface Prod {
        categorie: {
            id_cat: number,
            nom: string
        },
        date_creation: string,
        description: string,
        marque: Object,
        nom: string,
        prix: number,
        image: string,
        quantite: number,
        reference: string
    }

    const [add, setAdd] = useState<{ nom: string; prix: number; description: string; quantite: number; }[]>(() => {
        const panierString = localStorage.getItem('panier');
        return panierString ? JSON.parse(panierString) : [];
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const prodValue = searchParams.get('produits');
    const catValue = searchParams.get('categories');
    const [theProd, setTheProd] = useState<Prod[]>([]);
    const [produitSimilaire, setProduitSimilaire] = useState<Prod[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if ((prodValue && prodValue.length > 0) && (catValue && catValue.length > 0)) {
            const apiUrl = `https://localhost:8000/produits?categories=${encodeURIComponent(catValue)}&produits=${encodeURIComponent(prodValue)}`;
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setTheProd(data.theProduct);
                    setProduitSimilaire(data.similary);
                    setLoading(false);
                    console.log('Data:', data);
                })
                .catch(error => {
                    navigate('/');
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            setLoading(false);
            console.log('No test parameter in URL');
        }
    }, [prodValue]);

    const imgcarrousel = [
        'un',
        'deux',
        'trois',
        'quatre',
        'cinq',
        'six'
    ];

    const produitPage = theProd.length > 0 ? {
        'nom': theProd[0].nom,
        'categorie': theProd[0].categorie.nom,
        'prix': theProd[0].prix,
        'description': theProd[0].description,
        'quantite': theProd[0].quantite,
        'image': theProd[0].image
    } : {
        'nom': '',
        'categorie': '',
        'prix': 0,
        'description': '',
        'quantite': 0,
        'image': 'image'
    };

    const [carrousel, setCarrousel] = useState(imgcarrousel);

    const handleAddStorage = () => {
        const produitExiste = add.find(item => item.nom === produitPage.nom);
        if (produitExiste) {
            const updatedAdd = add.map(item =>
                item.nom === produitPage.nom
                    ? { ...item, quantite: item.quantite + 1 }
                    : item
            );
            setAdd(updatedAdd);
            localStorage.setItem('panier', JSON.stringify(updatedAdd));
            setShowModal(true);
        } else {
            const updatedAdd = [...add, { ...produitPage, quantite: 1 }];
            setAdd(updatedAdd);
            localStorage.setItem('panier', JSON.stringify(updatedAdd));
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const affiche = localStorage.getItem('panier');
    if (affiche !== null) {
        const res = JSON.parse(affiche);
        console.log('mon panier :', res, '\ntaille du panier :', res.length);
    } else {
        console.error('raaaaaaaah');
    }

    return (
        <Layout>
            <div>
                <img src={cascade} alt="canape" className="carrousel-size mb-5" />
                <div className="container">
                    <Modal show={showModal} handleClose={handleCloseModal} />
                    <div className="row">
                        <div id="carouselExampleSlidesOnly" className="carousel slide col-12 col-md-6" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {carrousel.map((img, index) => <button key={index}
                                    type="button"
                                    data-bs-target="#carouselExampleSlidesOnly"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                    aria-current={index === 0 ? "true" : undefined}
                                    aria-label={`Slide ${index}`}
                                ></button>)}
                            </div>
                            <div className="carousel-inner">
                                {carrousel.map((img, index) => <div key={index}
                                    className={index === 0 ? "carousel-item active" : "carousel-item"}
                                    data-bs-interval="5000">
                                    <img src={armoire} className="d-block w-100" alt="..." />
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 desc-produits">
                            <div className="product-info">
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="font-bolder">{produitPage.prix}€</span>
                                    <div className="d-flex flex-column">
                                        <span className="text-uppercase font-bolder">{produitPage.nom}</span>
                                        <span className="text-end">{produitPage.quantite > 10 ? "En stock" : "bientôt en rupture de stock"}</span>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>{produitPage.description}</p>
                                </div>
                                <div className="text-center">
                                    <button onClick={handleAddStorage}>AJOUTER AU PANIER</button>
                                </div>
                            </div>
                            <div className="text-center text-color mt-5">
                                <h1>PRODUIT SIMILAIRE</h1>
                                <div className="row justify-content-center">
                                    {produitSimilaire.map((p, index) => <Link key={index} to={`/produits?categories=${encodeURIComponent(produitPage.categorie)}&produits=${encodeURIComponent(p.nom)}`} className="row text-center text-decoration-none col-3 my-3 mx-3">
                                        <img src={lit} alt="" className=" mb-2 rounded-5" />
                                        <span className="text-dark font-bolder">{p.nom}</span>
                                    </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Produit;