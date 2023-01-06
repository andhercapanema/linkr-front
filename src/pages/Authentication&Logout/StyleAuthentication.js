import styled, { css } from "styled-components";
import COLORS from "../../common/constants/colors";

export const All = styled.div`
   display: flex;
   @media (max-width: 700px) {
        flex-direction: column;
    }
`

export const Left = styled.div`
    background-color: #000000;
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
        color: #FFFFFF;
        font-family: "Passion One";
        font-size: 106px;
        font-weight: 700;
        line-height: 117px;
        letter-spacing: 0.05em;
        text-align: left;
        margin-left: 10%;
    }
    h2{
        color: #FFFFFF;
        font-family: "Oswald";
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

export const Right = styled.div`
    background-color: ${COLORS.base};
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

export const Input = styled.div`
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
        font-family: "Oswald";
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: left;
        color: #9F9F9F;
    }
`

export const Button = styled.div`
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
            font-family: "Oswald";
            font-size: 27px;
            font-weight: 700;
            line-height: 40px;
        }   
    }
`

export const Siginup = styled.div`
    display: flex;
    justify-content: center;
    h1{
        color: #FFFFFF;
        font-family: "Lato";
        font-size: 20px;
        font-weight: 400;
    }
`