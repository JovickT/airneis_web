import logo from '../img/logo.png'
import search from '../img/search.png'
import shop from '../img/shop.png'
import burger from '../img/menu.png'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Recherche from "./Recherche";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('jwt_token');
        setIsLoggedIn(false);
        navigate('/');
    }

    const affiche = localStorage.getItem('panier');
    var res: any = [];
    if (affiche !== null) {
        res = JSON.parse(affiche);
        
        console.log('mon panier :', res, '\ntaille du panier :', res.length);
    } else {
        console.error('panier vide');
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const [showRecherche, setShowRecherche] = useState(false);

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

    const [menuCo, setMenuCo] = useState(menuConnexion);

    const navigate = useNavigate();

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handlePanier = () => {
        navigate("/panier");
    }

    const handleNavigation = (list: string) => {
        console.log('handleNavigation:', list);
        
        switch (list) {
            case 'Se connecter':
                navigate("/connexion");
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
