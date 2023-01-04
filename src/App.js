import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import SigninPage from "./pages/Authentication&Logout/SigninPage";
import SignupPage from "./pages/Authentication&Logout/SignupPage";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import Contexts from "./common/contexts/Contexts";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Contexts>
                <Routes>
                    <Route path="/" element={<SigninPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/timeline" element={<TimelinePage />} />
                </Routes>
            </Contexts>
        </BrowserRouter>
    );
}

export default App;
