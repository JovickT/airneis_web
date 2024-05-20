import { useState, useEffect } from 'react';
import  facebook  from "../img/facebook.png";
import  instagram  from "../img/instagram.png";

const Footer = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200 ) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    let navbarClasses = ['footer'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    return (
        <>
          <footer className={navbarClasses.join(" ")}>
            <ul className="d-flex">
                <li className="me-2"><a href="/cgu" className="text-decoration-none color-link">CGU</a></li>
                <li className="me-2"><a href="/mentions" className="text-decoration-none color-link">Mentions légales</a></li>
                <li><a href="/contact" className="text-decoration-none color-link">Contact</a></li>
            </ul>
            <div>
                <ul className="d-flex me-2">
                    <li><img src={facebook} alt="facebook" /></li>
                    <li><img src={instagram} alt="instagram" /></li>
                </ul>
            </div>
        </footer>
        </>
    )
}

export default Footer;
