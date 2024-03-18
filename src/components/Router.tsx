import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';


const Rooter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} />
        </Routes>
    </BrowserRouter>
    
  );
};

export default Rooter;