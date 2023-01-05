import React from "react";
import { StyledLinkSnippet } from "./style";

function LinkSnippet({ metadata, id }) {
    const { description, image, title, url } = metadata;

    return (
        <StyledLinkSnippet href={url} target="_blank" rel="noreferrer">
            <div>
                <h5>{title}</h5>
                <p>{description}</p>
                <h6>{url}</h6>
            </div>
            <img alt="Link" src={image} />
        </StyledLinkSnippet>
    );
}

export default LinkSnippet;
