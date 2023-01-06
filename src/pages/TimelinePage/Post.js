import React, { useEffect, useRef, useState } from "react";
import LinkrResources from "../../common/services/LinkrResources";
import LinkSnippet from "./LinkSnippet";
import {
    LikesColumn,
    PostInfos,
    StyledPost,
    UsernameEditDelete,
} from "./style";

function Post({ post, user: loggedUser }) {
    const {
        id,
        description: dbDescription,
        likes_amount: likesAmount,
        user,
        metadata,
    } = post;
    const postAuthorIsLoggedUser = loggedUser.id === user.id;
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(dbDescription);
    const [description, setDescription] = useState(dbDescription);
    const inputRef = useRef(null);
    const userToken = "banana";
    const [editionIsLoading, setEditionIsLoading] = useState(false);

    function editPost() {
        if (isEditing) setEditedDescription(description);
        setIsEditing((prev) => !prev);
    }

    function changeDescription(e) {
        setEditedDescription(e.target.value);
    }

    async function saveChanges(e) {
        e.preventDefault();
        setEditionIsLoading(true);

        try {
            await LinkrResources.editPostDescription(
                id,
                { description: editedDescription },
                userToken
            );

            setEditionIsLoading(false);
            setDescription(editedDescription);
            setIsEditing(false);
        } catch (err) {
            alert(
                "An error occured while trying to edit your post, please try again"
            );
            console.error(err.response);
            setEditionIsLoading(false);
        }
    }

    useEffect(() => {
        if (isEditing) inputRef.current.focus();

        window &&
            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    setEditedDescription(description);
                    setIsEditing(false);
                }
            });
    }, [isEditing, description]);

    return (
        <StyledPost>
            <LikesColumn>
                <img alt="User profile" src={user.picture_url} />
                <ion-icon name="heart-outline"></ion-icon>
                <p>{likesAmount} likes</p>
            </LikesColumn>
            <PostInfos>
                <UsernameEditDelete>
                    <h4>{user.username}</h4>
                    {postAuthorIsLoggedUser && (
                        <div>
                            <ion-icon
                                name="create"
                                onClick={editPost}
                            ></ion-icon>
                            <ion-icon name="trash"></ion-icon>
                        </div>
                    )}
                </UsernameEditDelete>
                {isEditing ? (
                    <form onSubmit={saveChanges}>
                        <input
                            onChange={changeDescription}
                            value={editedDescription}
                            ref={inputRef}
                            disabled={editionIsLoading}
                        />
                    </form>
                ) : (
                    <p>{description}</p>
                )}

                <LinkSnippet metadata={metadata} id={id} />
            </PostInfos>
        </StyledPost>
    );
}

export default Post;
