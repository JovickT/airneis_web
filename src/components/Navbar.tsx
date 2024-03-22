import logo from '../img/logo.png'
import search from '../img/search.png'
import shop from '../img/shop.png'
import burger from '../img/menu.png'
import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react'

const Navbar = () =>{
    const [menuOpen, setMenuOpen] = useState(false);
    const menuConnexion =[
        'Mes paramètre',
        'Mes commandes',
        'CGU',
        'Mention légales',
        'Contact',
        'À propos d’ÀIRNEIS',
        'Se déconnecter'
    ];
    const menu =[
        'Se connecter',
        "S'inscrire",
        'CGU',
        'Mention légales',
        'Contact',
        'À propos d’ÀIRNEIS',
    ]

    const[menuCo, setMenuCo] = useState(menu);

    const navigate = useNavigate();

    const handleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    const handleNavigation = (list: string) =>{
        console.log('handleNavigation:',list);
        
        switch (list) {
            case 'Se connecter':
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

    return(
        <>
            <nav className='d-flex bg-light position-fixed top-0 w-100 z-3'>
                <a className='mt-2' href="/"><img src={logo} alt="logo" /></a>
                <div className="d-flex web-nav justify-content-end">
                    <ul className="d-flex me-3 mt-2">
                        <li className='me-3'><img src={search} alt="recherche" className='logo-size'/></li>
                        <li className='me-3'><img src={shop} alt="panier" className='logo-size'/></li>
                        <li ><img src={burger} alt="menu" className='logo-size' onClick={handleMenu}/></li>
                    </ul>
                </div>
            </nav>

            {menuOpen && (
                <div className='text-center bg-light slide-menu'>
                    <ul>
                        {menuCo.map((list,index) =><li key={index} className='point-menu me-3' onClick={() => handleNavigation(list)}>{list}</li>)}
                    </ul>
                </div>
            )}

        </>
    )
}

export default Navbar;