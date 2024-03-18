import logo from '../img/logo.png'
import search from '../img/search.png'
import shop from '../img/shop.png'
import burger from '../img/menu.png'
const Navbar = () =>{
    return(
        <>
            <nav className='d-flex bg-light'>
                <a className='mt-2' href="/"><img src={logo} alt="logo" /></a>
                <div className="d-flex web-nav justify-content-end">
                    <ul className="d-flex me-3 mt-2">
                        <li className='me-3'><a href="/"><img src={search} alt="recherche" className='logo-size'/></a></li>
                        <li className='me-3'><a href="/"><img src={shop} alt="panier" className='logo-size'/></a></li>
                        <li ><a href="/"><img src={burger} alt="menu" className='logo-size'/></a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;