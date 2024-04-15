import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Movies from "./pages/Movie/Movies";
import MovieDetail from "./pages/Movie/MovieDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Protected from "./components/common/Protected";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Protected />}>
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<MovieDetail />} />
                </Route>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
