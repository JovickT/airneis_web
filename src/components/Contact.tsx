import Layout from "./Layout"
import logo from "../img/logo.png"
const Contact = () =>{
    return(
        <Layout>
            <div className="d-flex flex-column align-items-center bg-page">
                <form action="" method="post" className="">
                    <fieldset>
                        <legend className="d-flex justify-content-center"><img src={logo} alt="Logo" /></legend>
                    <div className="d-flex mb-5">
                        <label htmlFor="" className="me-4 m-content">Nom
                            <input type="text" name="nom" id="nom" placeholder="Jones" className="mx-2"/>
                        </label>
                        <label htmlFor="" className="m-content">Prénom
                            <input type="text" name="prenom" id="prenom" placeholder="John"/>
                        </label>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <label htmlFor="" className="mb-5 m-content">Email
                            <input type="email" name="email" id="email" placeholder="exemple@xyz.fr"/>
                        </label>
                        <label htmlFor="" className="m-content mb-5">Message
                            <textarea name="message" id="message" cols={30} rows={10} placeholder="Message....."/>
                        </label>
                        <button type="submit">
                            Envoyer
                        </button>
                    </div>
                    </fieldset>
                </form>
                <div className="test"></div>
            </div>
        </Layout>
    )
}

export default Contact;