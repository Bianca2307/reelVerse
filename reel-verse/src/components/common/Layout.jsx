
import { Outlet } from "react-router-dom"
import Header from "./Header/Header"

export default function Layout(){
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
        
    )
}