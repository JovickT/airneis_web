import Layout from "./Layout"
import cascade from "../img/bannierejpg.jpg"
import { useState } from "react";

const About = () =>{
 
    return(
        <Layout>
            <div className="bg-page">
                <img src={cascade} alt="" className="carrousel-size carousel-top"/>
                <div className="container mt-5 d-flex">
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                </div>
                
                <div className="about">
                    <h1 className="text-center text-color about-h1">À propos d'ÀIRNEIS</h1><br/>
                    <p>
                        Bienvenue chez ÀIRNEIS, votre destination pour des meubles de qualité supérieure, conçus par des designers écossais passionnés. Notre nom, ÀIRNEIS, signifie "meuble" en gaélique écossais, un hommage à nos racines et à notre engagement envers la tradition et l'innovation.
                    </p>
                    <h4 className="mt-5 text-color">Qui sommes-nous ?</h4>
                    <p>
                        ÀIRNEIS est une société écossaise qui se distingue par son engagement envers l'artisanat, la qualité et le design innovant. Depuis notre création, nous avons toujours mis l'accent sur la collaboration avec des designers écossais talentueux pour créer des pièces uniques qui reflètent l'essence de l'Écosse - robustes, élégantes et intemporelles.
                    </p>
                    <h4 className="mt-5 text-color">Notre histoire</h4>
                    <p>
                        Jusqu'à récemment, nous avons opéré principalement par correspondance et à travers des magasins partenaires. Cette méthode nous a permis de bâtir une clientèle fidèle, tant localement qu'à l'international. Cependant, nous avons réalisé qu'il était temps d'évoluer et d'embrasser l'ère numérique pour offrir une expérience d'achat plus fluide et accessible à tous nos clients.
                    </p>
                    <h4 className="mt-5 text-color">Notre mission</h4>
                    <p>
                        Notre mission est simple : apporter le meilleur du design écossais au monde entier. Nous croyons que chaque meuble que nous créons raconte une histoire, celle de l'héritage écossais et de l'innovation contemporaine. En lançant notre propre solution e-commerce, nous visons à atteindre une clientèle internationale tout en renforçant notre présence locale.
                    </p>
                    <h4 className="mt-5 text-color">Nos produits</h4>
                    <p>
                        Chez ÀIRNEIS, chaque produit est conçu avec une attention méticuleuse aux détails et un respect profond pour les matériaux de qualité. Nous proposons une gamme diversifiée de meubles, allant des canapés luxueux aux lits confortables, en passant par des tables et des chaises élégantes. Nos meubles sont non seulement esthétiquement plaisants mais aussi durables, faits pour résister à l'épreuve du temps.
                    </p>
                    <h4 className="mt-5 text-color">Pourquoi choisir ÀIRNEIS ?</h4>
                    <p>
                        1. Design Écossais Authentique :<br/><span className="about-marge">Nos meubles sont conçus par des designers écossais de renom, assurant une touche authentique et unique à chaque pièce.</span><br/><br/>
                        2. Qualité Supérieure :<br/><span className="about-marge">Nous utilisons des matériaux de haute qualité pour garantir la durabilité et la robustesse de nos meubles.</span><br/><br/>
                        3. Engagement Écologique :<br/><span className="about-marge">Nous sommes engagés dans des pratiques de fabrication durables, minimisant notre empreinte écologique tout en produisant des meubles d'excellence.</span><br/><br/>
                        4. Service Client Exceptionnel :<br/><span className="about-marge">Notre équipe est dédiée à fournir un service client de premier ordre, assurant que chaque achat est une expérience positive et mémorable.</span>
                    </p>
                    <h4 className="mt-5 text-color">Notre Vision pour l'Avenir</h4>
                    <p>
                        Avec le lancement de notre site d'e-commerce mobile-first, nous visons à révolutionner la façon dont nos clients interagissent avec nos produits. Nous allons également développer une application mobile Android et iOS, alignée sur la version mobile web, pour rendre l'expérience d'achat encore plus accessible et intuitive.<br/><br/>
                        En plus de notre plateforme e-commerce, nous mettons en place un backoffice web sophistiqué pour gérer le contenu de manière efficace et sécurisée. Ce système comprendra des solutions de paiement sécurisées, assurant une transaction sans souci pour nos clients.
                    </p>
                    <h4 className="mt-5 text-color">Rejoignez-nous dans cette aventure</h4>
                    <p>
                        Chez ÀIRNEIS, nous sommes passionnés par le design et l'innovation. Nous sommes ravis de partager notre voyage avec vous et de vous offrir des meubles qui apporteront élégance et confort à votre maison. Rejoignez-nous dans cette aventure et découvrez l'art de vivre à l'écossaise, avec des meubles qui sont non seulement fonctionnels mais aussi inspirants.<br/><br/>
                        Merci de faire partie de la famille ÀIRNEIS. Ensemble, nous allons transformer chaque maison en un foyer élégant et accueillant, grâce à la magie du design écossais.
                    </p>
                </div>
                <div className="container mt-5 d-flex">
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                    <div className="mx-3">
                        <img src={cascade} alt="" className="w-100"/>
                        <div className="d-flex justify-content-between">
                            <span>Metier</span>
                            <span>Fullname</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About;