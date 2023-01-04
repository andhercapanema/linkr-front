import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import Contexts from "./common/contexts/Contexts";
import TimelinePage from "./pages/TimelinePage/TimelinePage";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Contexts>
                <Routes>
                    <Route path="/timeline" element={<TimelinePage />} />
                </Routes>
            </Contexts>
        </BrowserRouter>
    );
}

export default App;
