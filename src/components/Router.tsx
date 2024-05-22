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
import Login from './Login';


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
            <Route path="/login" element={<Login />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/mesCommandes" element={<MesCommandes />} />
            <Route path="/commande" element={<Commande />} />
            <Route path="/checkoutLivraison" element={<CheckoutLivraison />} />
            <Route path="/checkoutPayement" element={<CheckoutPayement />} />
            <Route path="/checkoutFini" element={<CheckoutFini />} />
        </Routes>
    </BrowserRouter>
    
  );
};

export default Rooter;