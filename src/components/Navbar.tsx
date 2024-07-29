import logo from '../img/logo.png'
import search from '../img/search.png'
import shop from '../img/shop.png'
import burger from '../img/menu.png'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import Recherche from "./Recherche";


const Navbar= () =>{
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [menuCo, setMenuCo] = useState<string[]>([]);
    const location = useLocation();
    const infoCommande = localStorage.getItem('info-livrasion');
    const infoPaiement = localStorage.getItem('clientSecret');

    useEffect(() => {
        if (isAuthenticated) {
            setMenuCo([
                'Mes paramètres',
                'Mes commandes',
                'CGU',
                'Mentions légales',
                'Contact',
                'À propos d’ÀIRNEIS',
                'Se déconnecter'
            ]);
        } else {
            setMenuCo([
                'Se connecter',
                'CGU',
                'Mentions légales',
                'Contact',
                'À propos d’ÀIRNEIS',
            ]);
        }
    }, [isAuthenticated]);


    const handleMenu = () =>{
        setMenuOpen(!menuOpen);
    }
    
    const handlePanier = () =>{
        navigate("/panier");
    }
    
    const handleLogout = async () => {
        if (logout) {

            if(infoCommande || infoPaiement){
                localStorage.removeItem('info-livraison');
                localStorage.removeItem('clientSecret');
            }

            try {
                await logout();
                navigate('/');
            } catch (error) {
                console.error('Erreur lors de la déconnexion', error);
            }
        }
    };
    const affiche  = localStorage.getItem('panier');
    var res: any = [];
    if (affiche !== null) {
        res = JSON.parse(affiche);
        
        console.log('mon panier :', res, '\ntaille du panier :', res.length);
    } else {
        console.error('panier vide');
    }

    const [showRecherche, setShowRecherche] = useState(false);

    const menuConnexion = user? [
        'Mes paramètres',
        'Mes commandes',
        'CGU',
        'Mention légales',
        'Contact',
        'À propos d’ÀIRNEIS',
        'Se déconnecter'
    ] : [
        'Se connecter',
        'CGU',
        'Mention légales',
        'Contact',
        'À propos d’ÀIRNEIS',
    ]

    const handleNavigation = (list: string) => {
        console.log('handleNavigation:', list);
        
        switch (list) {
            case 'Se connecter':
                navigate("/connexion");
                break;
            case 'Se déconnecter':
                handleLogout();
                break;
            case 'Se déconnecter':
                handleLogout();
                break;
            case "S'inscrire":
                break;
            case 'CGU':
                navigate("/cgu");
                break;
            case 'Mention légales':
                navigate("/mentions");
                break;
            case 'Contact':
                navigate("/contact");
                break;
            case 'Mes paramètres':
                navigate("/parametres");
                break;
            case 'À propos d’ÀIRNEIS':
                navigate("/about");
                break;
            case 'Mes commandes':
                navigate("/MesCommandes");
                break;
            default:
                console.error('ce lien n\'existe pas');
                break;
        }
    }

    const handleShowRecherche = () => {
        setShowRecherche(true);
    }

    const handleCloseRecherche = () => {
        setShowRecherche(false);
    }

    return (
        <>
            <nav className='head'>
                <a className='head-logo' href="/"><img src={logo} alt="logo" /></a>
                <div className="head-taille">
                    <ul className="head-box-btn">
                        <li className='logo-recherche'>
                            <img src={search} alt="recherche" className='logo-size' onClick={handleShowRecherche} />
                        </li>
                        <li className='logo-panier'>
                            <img src={shop} alt="panier" className='logo-size-panier' onClick={handlePanier} />
                            <div className='compteur-panier'>
                                <span className='shop-cart'>{res.length}</span>
                            </div>
                        </li>
                        <li>
                            <img src={burger} alt="menu" className='logo-size' onClick={handleMenu} />
                        </li>
                    </ul>
                </div>
            </nav>


            {menuOpen && (
                <div className='head-deroulant'>
                    <ul>
                        {menuCo.map((list, index) => 
                            <li key={index} className='head-deroulant-link' onClick={() => handleNavigation(list)}>
                                {list}
                            </li>
                        )}
                    </ul>
                </div>
            )}

            <Recherche show={showRecherche} handleClose={handleCloseRecherche} />
        </>
    )
}

export default Navbar;
