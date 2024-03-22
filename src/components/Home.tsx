import  img1  from "../img/caroussel1.jpg";
import  img2  from "../img/caroussel2.jpg";
import  img3  from "../img/carousel3.jpg";

//import  armoire  from "../img/armoire.jpg";
import  canape  from "../img/canape.jpg";
import  lit  from "../img/lit.jpg";
import  cascade  from "../img/bannierejpg.jpg";
import Layout from "./Layout";

const Home = () =>{
    return(
        <Layout>
            <div className="d-flex justify-content-center">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                    <img src={cascade} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="10000">
                    <img src={cascade} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="10000">
                    <img src={cascade} className="d-block w-100" alt="..."/>
                    </div>
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
            <div className="d-flex justify-content-center text-center align-items-center my-5 color-background">
            
                <a href="http://localhost:3000/categorie" className="d-flex flex-column align-items-center">
                    <img src={canape} alt="" className="w-50 mb-2 rounded"/>
                    <span className="font-bolder">Catégorie</span>
                </a>

                <a href="http://localhost:3000/categorie" className="d-flex flex-column align-items-center">
                    <img src={canape} alt="" className="w-50 mb-2 rounded"/>
                    <span className="font-bolder">Catégorie</span>
                </a>

                <a href="http://localhost:3000/categorie" className="d-flex flex-column align-items-center">
                    <img src={canape} alt="" className="w-50 mb-2 rounded"/>
                    <span className="font-bolder">Catégorie</span>
                </a>
                
            
            </div>
            <div className="d-flex justify-content-center text-center align-items-center my-5 color-background">

                <div className="card me-5" >
                    <img className="card-img-top" src={lit} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div className="card me-5" >
                    <img className="card-img-top" src={lit} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div className="card me-5" >
                    <img className="card-img-top" src={lit} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div className="card me-5" >
                    <img className="card-img-top" src={lit} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            
            </div>
        </Layout>
    )
}

export default Home;