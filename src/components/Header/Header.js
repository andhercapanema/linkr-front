import styled from "styled-components";
import COLORS from "../../common/constants/colors";
import logo from "../../assets/styles/Image/linkr.png";
import up from "../../assets/styles/Image/up.png";
import down from "../../assets/styles/Image/down.png";
import teste from "../../assets/styles/Image/teste.png";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Header() {

    const [vector, setVector] = useState(down);
    const [name, setName] = useState("down");

    const navigate = useNavigate();

    function logout() {
        console.log("cheguei")

        console.log("name", name)

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

const HeaderTimeline = styled.div`
    background-color:  ${COLORS.accent1};
    width: 100vw;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin-left: 2%;
        img{
        height: 50px;
        }
    }
`

const Right = styled.div`
    display: flex;
    margin-right: 2%;
    h2{
        margin-right:10px;
        display: flex;
        align-items: center;
    }
    h3{
        width: 52px;
        height: 52px;
        border-radius: 26.5px;
    }

`

const Logout = styled.div`
    display: ${props => props.display == "down" ? "none" : "flex" };
    justify-content: flex-end;
    background-color:  ${COLORS.base};
    button{
        width: 150px;
        height: 47px;
        background-color: ${COLORS.accent1};
        border-bottom-left-radius: 20px;
        height: 47px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-family: "Lato";
        font-size: 20px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
    `

