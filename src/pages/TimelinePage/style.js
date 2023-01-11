import styled from "styled-components";
import COLORS from "../../common/constants/colors";

export const StyledTimelinePage = styled.main`
    background-color: ${COLORS.base};
    min-height: calc(100vh - 72px);
    color: ${COLORS.text1};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 calc((100vw - 611px) / 2);

    h2 {
        font-family: "Oswald";
        font-weight: 700;
        font-size: 33px;
        line-height: 49px;
        width: 100%;
        max-width: 611px;

        padding: 19px 0 19px 17px;

        @media (min-width: 611px) {
            margin-top: 72px;
            padding: 60px 0 48px;
        }
    }

    h4 {
        font-family: "Lato";
        text-align: center;
        font-weight: 500;
        font-size: 25px;
        margin-top: 15px;
    }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 60px;
    img {
        margin-right: 18px;
    }
    h1 {
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
        letter-spacing: 0em;
        text-align: left;
    }
`;

export const Data = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Username = styled.div`
    h1 {
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
    }
`;

export const PostInfo = styled.div`
    margin-top: 5px;

    h1 {
        font-size: 15px;
        line-height: 18px;
        color: ${COLORS.text3};
        margin-bottom: 13px;

        @media (min-width: 611px) {
            font-size: 17px;
            line-height: 20px;
        }
    }
`;
