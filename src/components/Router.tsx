import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categorie from './Categorie';
import Home from './Home';
import Contact from './Contact';
import Ml from './Ml';
import About from './About';
import CGU from './CGU';


const Rooter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorie" element={<Categorie />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions" element={<Ml />} />
            <Route path="/about" element={<About />} />
            <Route path="/cgu" element={<CGU />} />
        </Routes>
    </BrowserRouter>
    
  );
};

export default Rooter;