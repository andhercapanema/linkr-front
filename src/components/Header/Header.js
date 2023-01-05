import logo from "../../assets/styles/Image/linkr.png";
import up from "../../assets/styles/Image/up.png";
import down from "../../assets/styles/Image/down.png";
import teste from "../../assets/styles/Image/teste.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HeaderTimeline, Right, Logout } from "./StyleHeader.js";

export default function Header() {

    const [vector, setVector] = useState(down);
    const [name, setName] = useState("down");

    const navigate = useNavigate();

    function logout() {
        if (name === "down") {
            setVector(up);
            setName("up");
        } else {
            setVector(down);
            setName("down");
        }
    }

    function logoutButton() {
        navigate("/");
    }

    return (
        <>
            <HeaderTimeline>
                <h1>
                    <img src={logo} alt="logo" />
                </h1>
                <Right>
                    <h2 onClick={logout}>
                        <img src={vector} alt={name} />
                    </h2>
                    <h3 onClick={logout}>
                        <img src={teste} alt="teste" />
                    </h3>
                </Right>
            </HeaderTimeline>
            <Logout display={name}>
                <button onClick={logoutButton}>Logout</button>
            </Logout>
        </>
    )
}