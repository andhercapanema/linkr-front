import styled, { css } from "styled-components";

export const StyledFollowButton = styled.button`
    border-radius: 5px;
    border: none;
    height: 31px;
    width: 112px;
    cursor: pointer;

    font-family: "Lato";
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;

    color: #fff;
    background: #1877f2;

    ${({ isFollowing }) =>
        isFollowing &&
        css`
            color: #1877f2;
            background: #fff;
        `}

    ${({ isLoading }) =>
        isLoading &&
        css`
            opacity: 0.7;
            cursor: default;
        `}
`;
