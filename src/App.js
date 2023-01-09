import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import SigninPage from "./pages/Authentication&Logout/SigninPage";
import SignupPage from "./pages/Authentication&Logout/SignupPage";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import AuthProvider from "./Ayth";
import UserPostsOnly from "./pages/TimelinePage/UserPostsOnlyPage";
import UserId from "./pages/TimelinePage/UserIdPage";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<SigninPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/timeline" element={<TimelinePage />} />
                    <Route path="/userPosts" element={< UserPostsOnly />} />
                    <Route path="/user/:id" element={< UserId />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
