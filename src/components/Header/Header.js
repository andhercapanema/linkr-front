import styled from "styled-components";
import logo from "../../assets/styles/Image/linkr.png";
import up from "../../assets/styles/Image/up.png";
import down from "../../assets/styles/Image/up.png";
import teste from "../../assets/styles/Image/teste.png";
import COLORS from "../../common/constants/colors";

export default function Header() {
    return (
        <Teste>
            <left>
                <img src={logo} alt="logo" />
            </left>
            <Right>
                <h1>
                    <img src={up} alt="vector" />
                </h1>
                <h2>
                    <img src={teste} alt="teste" />
                </h2>
            </Right>
        </Teste>
    )
}

const Teste = styled.div`
    background-color:  ${COLORS.accent1};
    width: 100vw;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    left{
        margin-left: 2%;
        img{
        height: 50px;
        }
    }
`

const Right = styled.div`
    display: flex;
    margin-right: 2%;
    h1{
        margin-right:10px;
        display: flex;
        align-items: center;
    }
    h2{
        width: 52px;
        height: 52px;
        border-radius: 26.5px;
    }

`

