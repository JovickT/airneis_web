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
            <ul className="footer-contenu">
                <li className="footer-link"><a href="/cgu">CGU<span className="divider"> |</span></a></li>
                <li className="footer-link"><a href="/mentions">Mentions légales<span className="divider"> |</span></a></li>
                <li className="footer-link"><a href="/contact">Contact</a></li>
            </ul>
            <ul className="footer-social">
                <li><img src={facebook} alt="facebook" /></li>
                <li><img src={instagram} alt="instagram" /></li>
            </ul>
        </footer>
        </>
    )
}

export default Footer;
