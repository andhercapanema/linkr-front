import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import SiginPage from "./pages/Authentication&Logout/SigninPage";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import Contexts from "./common/contexts/Contexts";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Contexts>
                <Routes>
                    <Route path="/" element={<SiginPage />}></Route>
                    <Route path="/timeline" element={<TimelinePage />} />
                </Routes>
            </Contexts>
        </BrowserRouter>
    );
}

export default App;
