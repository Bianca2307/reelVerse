
import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout(){
    return (
        <div>
            <Header />
            <main>
                <Outlet />
                <ToastContainer />
            </main>
        </div>
        
    )
}