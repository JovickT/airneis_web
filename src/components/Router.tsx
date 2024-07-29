import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categorie from './Categorie';
import Home from './Home';
import Contact from './Contact';
import Ml from './Ml';
import About from './About';
import CGU from './CGU';
import Produit from './Produit';
import Panier from './Panier';
import MesCommandes from './MesCommandes';
import Commande from './Commande';
import CheckoutLivraison from './CheckoutLivraison';
import CheckoutPayement from './CheckoutPayement';
import CheckoutFini from './CheckoutFini';
import Parametres from './Parametres';
import Connexion from './Connexion';
import Inscription from './Inscription';
import ResultatRecherche from './ResultatRecherche';
import PasswordForgotten from './PasswordForgotten';


const Rooter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorie" element={<Categorie />} />
            <Route path="/produits" element={<Produit />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions" element={<Ml />} />
            <Route path="/about" element={<About />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/parametres" element={<Parametres/>} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/resultatRecherche" element={<ResultatRecherche />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/mesCommandes" element={<MesCommandes />} />
            <Route path="/commande" element={<Commande />} />
            <Route path="/checkoutLivraison" element={<CheckoutLivraison />} />
            <Route path="/checkoutPayement" element={<CheckoutPayement />} />
            <Route path="/checkoutFini" element={<CheckoutFini />} />
            <Route path="/PasswordForgotten" element={<PasswordForgotten />} /> 
        </Routes>
    </BrowserRouter>
    
  );
};

export default Rooter;