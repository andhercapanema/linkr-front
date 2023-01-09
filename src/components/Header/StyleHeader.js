import styled from "styled-components";
import COLORS from "../../common/constants/colors";

export const HeaderTimeline = styled.div`
    background-color: ${COLORS.accent1};
    width: 100vw;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        margin-left: 2%;
        img {
            height: 50px;
        }
    }
`;

export const Right = styled.div`
    display: flex;
    margin-right: 2%;
    h2 {
        margin-right: 10px;
        display: flex;
        align-items: center;
    }
    h3 {
        img {
            width: 52px;
            height: 52px;
            border-radius: 26.5px;
        }
    }
`;

export const Logout = styled.div`
    display: ${(props) => (props.display === "down" ? "none" : "flex")};
    justify-content: flex-end;
    background-color: ${COLORS.base};
    margin-left: auto;
    margin-right: 0;

    button {
        width: 150px;
        height: 47px;
        background-color: ${COLORS.accent1};
        border-bottom-left-radius: 20px;
        height: 47px;
        border: none;

        display: flex;
        justify-content: center;
        align-items: center;

        font-family: "Lato";
        font-size: 20px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #ffffff;
    }
`;

export const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${COLORS.base};

    position: fixed;
    z-index: 1;
`;
