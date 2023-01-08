import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router";
import LinkrResources from "../../common/services/LinkrResources";
import DeleteModal from "./DeleteModal";
import LinkSnippet from "./LinkSnippet";
import {
    LikesColumn,
    PostInfos,
    StyledPost,
    UsernameEditDelete,
} from "./style";
import { AuthContext } from "../../Ayth";

function Post({ post, updateTimeline }) {
    const {
        id,
        description: dbDescription,
        likes_amount: likesAmount,
        user,
        metadata,
    } = post;
    const { username: loggedUsername, token } = useContext(AuthContext);

    const postAuthorIsLoggedUser = loggedUsername === user.username;

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(dbDescription);
    const [description, setDescription] = useState(dbDescription);
    const inputRef = useRef(null);
    const [editionIsLoading, setEditionIsLoading] = useState(false);

    const { setUser } = useContext(AuthContext);


    const navigate = useNavigate();

    function editPost() {
        if (isEditing) setEditedDescription(description);
        setIsEditing((prev) => !prev);
    }

    function changeDescription(e) {
        setEditedDescription(e.target.value);
    }

    function redirectToUserPage(){
        setUser(user);
        navigate("/userPosts");
    }

    async function saveChanges(e) {
        e.preventDefault();
        setEditionIsLoading(true);

        try {
            await LinkrResources.editPostDescription(
                id,
                { description: editedDescription },
                token
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

    console.log(post);
    return (
        <StyledPost>
            <LikesColumn>
                <img alt="User profile" src={user.picture_url} onClick={redirectToUserPage} />
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
                            <ion-icon
                                name="trash"
                                onClick={() => setDeleteModalIsOpen(true)}
                            ></ion-icon>
                            <DeleteModal
                                deleteModalIsOpen={deleteModalIsOpen}
                                setDeleteModalIsOpen={setDeleteModalIsOpen}
                                postId={post.id}
                                updateTimeline={updateTimeline}
                            />
                        </div>
                    )}
                </UsernameEditDelete>
                {isEditing ? (
                    <form onSubmit={saveChanges}>
                        <input
                            onChange={(e) =>
                                setEditedDescription(e.target.value)
                            }
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
