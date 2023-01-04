import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import SiginPage from "./pages/Authentication&Logout/SigninPage";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                    <Route path="/" element={<SiginPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
