import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "./Home";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({children}) =>{
    return(
        <>
            <Navbar/>
                <div>{children}</div>
            <Footer/>
        </>
    )
}

export default Layout;