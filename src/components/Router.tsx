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


const Rooter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:nom_categorie" element={<Categorie />} />
            <Route path="/:nom_categorie/:nom_produit" element={<Produit />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions" element={<Ml />} />
            <Route path="/about" element={<About />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/panier" element={<Panier />} />
        </Routes>
    </BrowserRouter>
    
  );
};

export default Rooter;