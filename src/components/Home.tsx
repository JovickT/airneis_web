import  img1  from "../img/caroussel1.jpg";
import  img2  from "../img/caroussel2.jpg";
import  img3  from "../img/carousel3.jpg";

//import  armoire  from "../img/armoire.jpg";
import  canape  from "../img/canape.jpg";
import  lit  from "../img/lit.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () =>{
    
    const categorie =[
        'armoire',
        'canapé',
        'table'
    ];

    const produit =[
        'armoire anglaire',
        'armoire allemande',
        'armoire suédoise'
    ];

    const imgcarrousel = [
        'un',
        'deux',
        'trois'
    ]

    const [cat,setCat] = useState(categorie);
    const [prod,setProd] = useState(produit);
    const [carrousel,setCarrousel] = useState(imgcarrousel);
   
    return(
        <Layout>
            <div className="d-flex justify-content-center">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="ride">
                <div className="carousel-inner">
                    {carrousel.map((img,index) =><div key={index} className="carousel-item active" data-bs-interval="5000">
                        <img src={cascade} className="d-block w-100" alt="carrousel"/>
                    </div>
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            
            <div className="text-center mt-4 ">
                <span className="font-bolder">
                    VENANT DES HAUTE TERRE D'ÉCOSSE <br/> NOS MEUBLES SONT IMMORTELS
                </span>
            </div>
            <div className="row justify-content-center my-5 color-background">
            
                {cat.map((c,index) =><a key={index} href={`/${encodeURIComponent(c)}`} className="row text-center col-3 my-3">
                    <img src={canape} alt="" className=" mb-2 rounded-5"/>
                    <span className="font-bolder">{c}</span>
                </a>
                )}
            </div>
            <h1 className="text-center text-color">Les Highlanders du moment</h1>
            <div className="d-flex justify-content-center text-center align-items-center my-5 color-background">

                {prod.map((p,index) =><Link key={index} to={`/${encodeURIComponent(categorie[index])}/${encodeURIComponent(p)}`} className="row text-center col-3 my-3 mx-3">
                    <img src={canape} alt="" className=" mb-2 rounded-5"/>
                    <span className="font-bolder">{p}</span>
                </Link>
                )}
            </div>
        </Layout>
    )
}

export default Home;