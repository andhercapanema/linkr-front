import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SignupPage() {

    const [emailSignup, setEmailSignup] = useState("");
    const [passwordSignup, setPasswordSignup] = useState("");
    const [usernameSignup, setUsernameSignup] = useState("");
    const [pictureSignup, setPictureSignup] = useState("");
    
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    //const { setToken } = useContext(AuthContext);

    function cadastre(e) {
        e.preventDefault();

        setDisable(true);

        const URL = "http://localhost:4000/signup"; //inserir url

        const body = {
            email: emailSignup,
            password: passwordSignup,
            username: usernameSignup,
            picture: pictureSignup
        }

        console.log("bodySignup", body);

        const promise = axios.post(URL, body);

        promise.then((res) => {
            //setToken(res.data.token);
            navigate("/");
        })

        promise.catch((err) => {
            console.log("err signup", err.response.data);
            alert(err.response.data);
            setDisable(false);
        })
    }

    return (

        <All>

            <Left>
                <h1>linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </Left>

            <Right>
                <form onSubmit={cadastre}>

                    <Input>
                        <input
                            type="email"
                            placeholder="  e-mail"
                            onChange={(e) => setEmailSignup(e.target.value)}
                            value={emailSignup}
                            required
                            disabled={disable}
                        />
                    </Input>

                    <Input>
                        <input
                            type="password"
                            placeholder="  password"
                            onChange={(e) => setPasswordSignup(e.target.value)}
                            value={passwordSignup}
                            required
                            disabled={disable}
                        />
                    </Input>

                    <Input>
                    <input
                        type="text"
                        placeholder="  username"
                        onChange={(e) => setUsernameSignup(e.target.value)}
                        value={usernameSignup}
                        required
                        disabled={disable}
                    />
                </Input>

                <Input>
                    <input
                        type="text"
                        placeholder="  picture url"
                        onChange={(e) => setPictureSignup(e.target.value)}
                        value={pictureSignup}
                        required
                        disabled={disable}
                    />
                </Input>

                    <Button>
                        <button
                            type="submit"
                            disabled={disable}
                        >
                            <h1>Sign Up</h1>
                        </button>
                    </Button>

                </form>

                <Siginup>
                    <Link to="/">
                        <h1>Switch back to log in</h1>
                    </Link>
                </Siginup>

            </Right>

        </All>
    )
}

const All = styled.div`
   display: flex;
   @media (max-width: 700px) {
        flex-direction: column;
    }
`

const Left = styled.div`
    background-color: #000000;
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
        color: #FFFFFF;
        font-family: Passion One;
        font-size: 106px;
        font-weight: 700;
        line-height: 117px;
        letter-spacing: 0.05em;
        text-align: left;
        margin-left: 10%;
    }
    h2{
        color: #FFFFFF;
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
        letter-spacing: 0em;
        text-align: left;
        width: 70%;
        margin-left: 10%;
    }
    @media (max-width: 700px) {
        width: 100%;
        height: 30vh;
    }
`

const Right = styled.div`
    background-color: #333;
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 700px) {
        width: 100%;
        height: 70vh;
        justify-content: flex-start;
        padding-top: 40px;
    }
`

const Input = styled.div`
    display: flex;
    justify-content: center;
    input {
        height: 65px;
        width: 70%;
        border-radius: 6px;
        border-color: #E5E5E5;
        border-style: solid;
        margin-bottom: 13px;
    }
    input::placeholder{
        font-family: Oswald;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: left;
        color: #9F9F9F;
    }
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    button {
        width: 70%;
        height: 65px;  
        border-radius: 6px;
        border-color: #1877F2;
        border-style: solid;
        background-color: #1877F2;
        margin-bottom: 22px; 
        h1{
            color: #FFFFFF;
            font-family: Oswald;
            font-size: 27px;
            font-weight: 700;
            line-height: 40px;
        }   
    }
`

const Siginup = styled.div`
    display: flex;
    justify-content: center;
    h1{
        color: #FFFFFF;
        font-family: Lato;
        font-size: 20px;
        font-weight: 400;
    }
`