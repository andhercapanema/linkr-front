import styled, { css } from "styled-components";
import COLORS from "../../common/constants/colors";

export const StyledTimelinePage = styled.main`
    background-color: ${COLORS.base};
    min-height: calc(100vh - 72px);
    margin-top: 72px;
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

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;

        @media (min-width: 611px) {
            width: 50px;
            height: 50px;
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
        margin-right: 18px;
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

export const PostsList = styled.ul`
    margin-top: 16px;
    width: 100%;
    font-family: "Lato";
`;

export const StyledPost = styled.li`
    background-color: ${COLORS.accent1};
    margin-bottom: 16px;
    padding: 12px 16px;
    display: flex;

    @media (min-width: 611px) {
        border-radius: 16px;
        padding: 20px;
    }
`;

export const LikesColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 14px;

    @media (min-width: 611px) {
        margin-right: 19px;
    }

    ion-icon {
        font-size: 17px;
        margin: 17px 0 12px;
        cursor: pointer;

        @media (min-width: 611px) {
            font-size: 20px;
            margin: 19px 0 4px;
        }
    }

    p {
        font-size: 9px;
        line-height: 11px;
        text-align: center;

        @media (min-width: 611px) {
            font-size: 11px;
            line-height: 13px;
        }
    }
`;

export const PostInfos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
        margin-bottom: 8px;
        padding: 5px 10px;
        border-radius: 7px;
        border: none;
        width: 100%;

        font-size: 14px;
        line-height: 17px;
        color: #4c4c4c;
    }

    p {
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

export const UsernameEditDelete = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;

    h4 {
        margin-top: 0;
        font-weight: 400;
        text-align: start;

        font-size: 17px;
        line-height: 20px;

        @media (min-width: 611px) {
            font-size: 19px;
            line-height: 23px;
        }
    }

    ion-icon {
        font-size: 17px;
        margin-left: 12px;
        cursor: pointer;

        @media (min-width: 611px) {
            font-size: 19px;
        }
    }
`;

export const StyledLinkSnippet = styled.a`
    display: flex;
    text-decoration: none;
    border: 1px solid #4d4d4d;
    border-radius: 11px;

    div {
        padding: 8px 0 8px 11px;
        width: 67%;

        @media (min-width: 611px) {
            padding: 24px 0 24px 20px;
        }

        h5 {
            font-size: 11px;
            line-height: 13px;
            color: ${COLORS.text4};
            margin-bottom: 4px;

            @media (min-width: 611px) {
                font-size: 16px;
                line-height: 19px;
            }
        }

        p,
        h6 {
            font-size: 9px;
            line-height: 11px;

            @media (min-width: 611px) {
                font-size: 11px;
                line-height: 13px;
            }
        }

        p {
            color: ${COLORS.text5};
            margin-bottom: 4px;

            @media (min-width: 611px) {
                margin-bottom: 13px;
            }
        }

        h6 {
            color: ${COLORS.text4};
        }
    }

    img {
        width: 33%;
        height: 100%;
        border-radius: 0px 11px 11px 0px;
    }
`;
