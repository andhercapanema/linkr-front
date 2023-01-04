import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SiginPage() {

    const [emailSignin, setEmailSignin] = useState("");
    const [passwordSigin, setPasswordSigin] = useState("");
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    //const { setToken } = useContext(AuthContext);

    function login(e) {
        e.preventDefault();

        setDisable(true);

        const URL = ""; //inserir url

        const body = {
            email: emailSignin,
            password: passwordSigin
        }

        const promise = axios.post(URL, body);

        promise.then((res) => {
            //setToken(res.data.token);
            navigate("/");
        })

        promise.catch((err) => {
            console.log("err sigin", err);
            alert(err);
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
                <form onSubmit={login}>

                    <Input>
                        <input
                            type="email"
                            placeholder="  e-mail"
                            onChange={(e) => setEmailSignin(e.target.value)}
                            value={emailSignin}
                            required
                            disabled={disable}
                        />
                    </Input>

                    <Input>
                        <input
                            type="password"
                            placeholder="  password"
                            onChange={(e) => setPasswordSigin(e.target.value)}
                            value={passwordSigin}
                            required
                            disabled={disable}
                        />
                    </Input>

                    <Button>
                        <button
                            type="submit"
                            disabled={disable}
                        >
                            <h1>Log In</h1>
                        </button>
                    </Button>

                </form>

                <Siginup>
                    <Link to="/siginup">
                        <h1>First time? Create an account!</h1>
                    </Link>
                </Siginup>

            </Right>

        </All>
    )
}

const All = styled.div`
   display: flex;
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
`

const Right = styled.div`
    background-color: #E5E5E5;
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
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