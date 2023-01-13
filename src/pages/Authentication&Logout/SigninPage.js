import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import {
    All,
    Left,
    Right,
    Input,
    Button,
    Siginup,
} from "./StyleAuthentication";
import { AuthContext } from "../../Ayth";

export default function SigninPage() {
    const [emailSignin, setEmailSignin] = useState("");
    const [passwordSigin, setPasswordSigin] = useState("");
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    const { setUsername, setPicture, setToken } = useContext(AuthContext);

    function login(e) {
        e.preventDefault();

        setDisable(true);

        const URL = "https://linkr-api-dj08.onrender.com/signin"; //inserir url

        const body = {
            email: emailSignin,
            password: passwordSigin,
        };

        const promise = axios.post(URL, body);

        promise.then((res) => {
            setToken(res.data[0]);
            setPicture(res.data[1].picture_url);
            setUsername(res.data[1].username);
            navigate("/timeline");
        });

        promise.catch((err) => {
            console.log("err signin", err.response.data);
            alert(err.response.data);
            setDisable(false);
        });
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
                        <button type="submit" disabled={disable}>
                            <h1>Log In</h1>
                        </button>
                    </Button>
                </form>

                <Siginup>
                    <Link to="/signup">
                        <h1>First time? Create an account!</h1>
                    </Link>
                </Siginup>
            </Right>
        </All>
    );
}
