import  facebook  from "../img/facebook.png";
import  instagram  from "../img/instagram.png";
const Footer = () =>{
    return(
        <>
          <footer className="d-flex justify-content-between align-items-center position-fixed bottom-0 w-100 bg-light ">
            <ul className="d-flex">
                <li className="me-2"><a href="/cgu" className="text-decoration-none color-link">CGU</a></li>
                <li className="me-2"><a href="/mentions" className="text-decoration-none color-link">mentions légales</a></li>
                <li><a href="/contact" className="text-decoration-none color-link">contact</a></li>
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