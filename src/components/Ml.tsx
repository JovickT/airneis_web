import { useState } from "react";
import Layout from "./Layout"

const Ml = () =>{

    return(
        <Layout>
            <div className="bg-page">
                <div className="line-separator"></div>
                <div className="container">
                    <h1 className="text-center text-color">MENTIONS LÉGALES</h1>
                    <p className="text-center mb-5">En vigueur au 10/07/2024</p>
                    <div className="position-relative left-25">
                        <p>
                        Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la<br/>
                        Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et<br/>
                        visiteurs, ci-après l""Utilisateur", du site airneis.com , ci-après le "Site", les présentes mentions<br/>
                        légales.
                        </p>
                        <p>
                        La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans<br/>
                        réserve des présentes mentions légales
                        </p>
                        <span >Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».</span>
                        <h4 className="mt-5 text-color">ARTICLE 1 - L'EDITEUR</h4>
                        <p>
                        L'édition du Site est assurée par Airneis SARL au capital de 10000 euros, immatriculée au Registre<br/>
                        du Commerce et des Sociétés de Beverworth sous le numéro 36252187900034 dont le siège social<br/>
                        est situé au 36232 Korbin Crossing 0334 Beverworth,<br/>
                        Numéro de téléphone 140874582169,<br/>
                        Adresse e-mail : contact@airneis.com.<br/>
                        N° de TVA intracommunautaire : EU372000041<br/>
                        Le Directeur de la publication est H3 Hitema<br/>
                        ci-après l'"Editeur".<br/>
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 2 - L'HEBERGEUR</h4>
                        <p>
                        L'hébergeur du Site est la société OVH, dont le siège social est situé au 2 rue Kellermann, 59100<br/>
                        Roubaix , avec le numéro de téléphone : 0952041876 + adresse mail de contact<br/>
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 3 - ACCES AU SITE</h4>
                        <p>Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption<br/>
                            programmée ou non et pouvant découlant d’une nécessité de maintenance.<br/>
                            En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu responsable.<br/>
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 4 - COLLECTE DES DONNEES</h4>
                        <p>
                        Le Site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect<br/>
                        de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers<br/>
                        et aux libertés.<br/>
                        1<br/>
                        En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit<br/>
                        d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur<br/>
                        exerce ce droit :<br/>
                        · via un formulaire de contact ;<br/>
                        Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site,<br/>
                        sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires<br/>
                        telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.<br/>
                        Pour plus d’informations, se reporter aux CGU du site airneis.com accessible à la rubrique "CGU"<br/>
                        </p>
                        <p>Rédigé sur http://legalplace.fr</p><br/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Ml;