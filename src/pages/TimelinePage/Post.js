import React from "react";
import LinkSnippet from "./LinkSnippet";
import { LikesColumn, PostInfos, StyledPost } from "./style";

function Post({ post }) {
    const { id, description, likes_amount: likesAmount, user, metadata } = post;

    return (
        <StyledPost>
            <LikesColumn>
                <img alt="User profile" src={user.picture_url} />
                <ion-icon name="heart-outline"></ion-icon>
                <p>{likesAmount} likes</p>
            </LikesColumn>
            <PostInfos>
                <h4>{user.username}</h4>
                <p>{description}</p>
                <LinkSnippet metadata={metadata} id={id} />
            </PostInfos>
        </StyledPost>
    );
}

export default Post;
