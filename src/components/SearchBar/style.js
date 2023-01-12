import styled from "styled-components";

export const StyledSearchBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    background: #ffffff;
    border-radius: 8px;
    width: calc(100vw - 30px);

    height: 45px;
    margin-top: 82px;
    z-index: 0;

    font-family: "Lato";

    @media (min-width: 611px) {
        width: calc(100vw - 366px);
        max-width: 563px;
        position: fixed;
        margin-top: 13.5px;
    }

    input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px;
        background: #fff;
        padding-left: 16px;
        z-index: 1;

        font-size: 17px;
        line-height: 20px;

        &::placeholder {
            font-size: 17px;
            line-height: 20px;
            color: #c6c6c6;
        }
    }

    ion-icon {
        font-size: 22px;
        color: #c6c6c6;
        position: absolute;
        top: calc((45px - 22px) / 2);
        right: 16px;
        z-index: 1;
    }
`;

export const SearchResultList = styled.ul`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #e7e7e7;
    border-radius: 8px;
    padding: 55px 0 10px;

    a {
        text-decoration: none;
    }

    li {
        display: flex;
        align-items: center;
        padding: 8px 17px;

        img {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            margin-right: 12px;
        }

        p {
            font-size: 19px;
            line-height: 23px;
            color: #515151;
        }

        span {
            margin-left: 7px;
            font-size: 19px;
            line-height: 23px;
            color: #c5c5c5;
        }
    }
`;
