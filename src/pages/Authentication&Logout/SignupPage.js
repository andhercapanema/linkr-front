import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {
    All,
    Left,
    Right,
    Input,
    Button,
    Siginup,
} from "./StyleAuthentication";

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

        const URL = "https://linkr-api-dj08.onrender.com/signup"; //inserir url

        const body = {
            email: emailSignup,
            password: passwordSignup,
            username: usernameSignup,
            picture: pictureSignup,
        };

        console.log("bodySignup", body);

        const promise = axios.post(URL, body);

        promise.then((res) => {
            navigate("/");
        });

        promise.catch((err) => {
            console.log("err signup", err.response.data);
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
                        <button type="submit" disabled={disable}>
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
    );
}
