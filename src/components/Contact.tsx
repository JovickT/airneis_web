import Layout from "./Layout"
import logo from "../img/logo.png"
import { useState } from "react";
const Contact = () =>{

    return(
        <Layout>
            <div className="d-flex flex-column align-items-center">
                <form action="" method="post" className="">
                    <fieldset>
                        <legend className="d-flex justify-content-center"><img src={logo} alt="Logo" /></legend>
                        <div className="contact-form-row">
                            <div className="contact-form-item">
                                <label htmlFor="nom" className="contact-label">Nom</label><br/>
                                <input type="text" name="nom" id="nom" placeholder="Jones" className="contact-input"/>
                            </div>
                            <div className="contact-form-item">
                                <label htmlFor="prenom" className="contact-label">Prénom</label><br/>
                                <input type="text" name="prenom" id="prenom" placeholder="John" className="contact-input"/>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center" >
                            <label htmlFor="" className="contact-label" style={{width: '100%'}}>Email</label>
                            <input type="email" className="contact-input" style={{width: '100%'}} name="email" id="email" placeholder="exemple@xyz.fr"/>
                            <label htmlFor="" className="contact-label" style={{width: '100%'}}>Message</label>
                            <textarea className="contact-input" style={{width: '100%'}} name="message" id="message" cols={30} rows={5} placeholder="Message....."/>
                            <button type="submit" className="contact-button">Envoyer</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </Layout>
    )
}

export default Contact;