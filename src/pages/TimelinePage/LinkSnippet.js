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
            <img
                alt="Link"
                src={
                    image
                        ? image
                        : "https://img.freepik.com/fotos-gratis/fundo-abstrato-com-design-baixo-poli_1048-8478.jpg?w=996&t=st=1673121185~exp=1673121785~hmac=036dbe8e4a6e988c2003ac821e652a530a133a3aa89c1a427af6a2b9a4cf5ed2"
                }
            />
        </StyledLinkSnippet>
    );
}

export default LinkSnippet;
