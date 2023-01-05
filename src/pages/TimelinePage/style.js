import styled, { css } from "styled-components";
import COLORS from "../../common/constants/colors";

export const StyledTimelinePage = styled.main`
    background-color: ${COLORS.base};
    min-height: calc(100vh - 72px);
    padding-top: 72px;
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
            padding: 78px 0 43px;
        }
    }
`;

export const PostCard = styled.div`
    background-color: #fff;
    color: ${COLORS.text2};
    padding: 12px 15px;
    width: 100%;

    display: flex;

    @media (min-width: 611px) {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 16px;
        padding: 16px 20px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 18px;
        object-fit: cover;
    }
`;

export const PostForm = styled.form`
    width: 100%;

    * {
        font-family: "Lato";
    }

    h3 {
        font-weight: 300;
        font-size: 17px;
        line-height: 20px;
        text-align: center;

        margin-bottom: 10px;

        @media (min-width: 611px) {
            text-align: start;
        }
    }

    input {
        background: #efefef;
        border-radius: 5px;
        border: none;
        margin-bottom: 6px;
        min-height: 30px;
        padding: 10px;
        width: 100%;

        &::placeholder {
            font-weight: 300;
            font-size: 13px;
            line-height: 16px;
            color: ${COLORS.postPlaceholder};
        }
    }

    div {
        display: flex;
        justify-content: flex-end;

        button {
            width: 112px;
            max-width: 112px;
            min-height: 22px;
            cursor: pointer;

            ${({ isLoading }) =>
                isLoading &&
                css`
                    opacity: 0.7;
                    cursor: default;
                `}

            background: ${COLORS.button};
            border-radius: 5px;
            border: none;

            color: ${COLORS.text1};
            font-weight: 700;
            font-size: 13px;
            line-height: 16px;
        }
    }
`;
