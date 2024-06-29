import logo from '../img/logo.png'
import search from '../img/search.png'
import shop from '../img/shop.png'
import burger from '../img/menu.png'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Recherche from "./Recherche";


const Navbar= () =>{
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [menuCo, setMenuCo] = useState<string[]>([]);

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

    const [menuOpen, setMenuOpen] = useState(false);
    const [compteur, setCompteur] = useState(0);
    
    const menuConnexion = isLoggedIn ? [
        'Mes paramètre',
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

    const[menuCo, setMenuCo] = useState(menuConnexion);

    const navigate = useNavigate();

    const handleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    const handlePanier = () =>{
        navigate("/panier");
    }

    const handleNavigation = (list: string) => {
        console.log('handleNavigation:', list);
        
        switch (list) {
            case 'Se connecter':
                navigate("/login");
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
            case 'À propos d’ÀIRNEIS':
                navigate("/about");
                break;
            default:
                console.error('ce lien n\'existe pas');
                break;
        }
        setMenuOpen(false);
    };


    const handleShowRecherche = () => {
        setShowRecherche(true);
    }

    const handleCloseRecherche = () => {
        setShowRecherche(false);
    }

    return (
        <>
            <nav className='d-flex bg-light position-fixed top-0 w-100 z-3'>
                <a className='mt-2' href="/"><img src={logo} alt="logo" /></a>
                <div className="d-flex web-nav justify-content-end">
                    <ul className="d-flex me-3 mt-2">
                        <li className='me-3'>
                            <img src={search} alt="recherche" className='logo-size' onClick={handleShowRecherche} />
                        </li>
                        <li className='me-3'>
                            <img src={shop} alt="panier" className='logo-size-panier' onClick={handlePanier} />
                            <div className='bg-danger text-light position-absolute compteur-panier'>
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
                <div className='text-center bg-light slide-menu'>
                    <ul>
                        {menuCo.map((list, index) => 
                            <li key={index} className='point-menu me-3 font-bolder' onClick={() => handleNavigation(list)}>
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
