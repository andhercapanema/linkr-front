import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import SigninPage from "./pages/Authentication&Logout/SigninPage";
import SignupPage from "./pages/Authentication&Logout/SignupPage";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                    <Route path="/" element={<SigninPage />}></Route>
                    <Route path="signup" element={<SignupPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
