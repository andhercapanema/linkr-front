import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import Contexts from "./common/contexts/Contexts";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Contexts>Linkr</Contexts>
        </BrowserRouter>
    );
}

export default App;
