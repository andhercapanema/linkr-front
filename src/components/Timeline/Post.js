import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router";
import LinkrResources from "../../common/services/LinkrResources";
import DeleteModal from "./DeleteModal";
import LinkSnippet from "./LinkSnippet";
import { ReactTagify } from "react-tagify";
import { AuthContext } from "../../Ayth";
import {
    LikesColumn,
    PostInfos,
    StyledPost,
    UsernameEditDelete,
} from "./style";

function Post({
    post,
    updatePosts,
    deletionIsLoading,
    setDeletionIsLoading,
    deleteModalIsOpen,
    setDeleteModalIsOpen,
}) {
    const {
        id,
        description: dbDescription,
        likes_amount: likesAmount,
        user,
        metadata,
    } = post;
    const {
        username: loggedUsername,
        token,
        setUser,
    } = useContext(AuthContext);

    const postAuthorIsLoggedUser = loggedUsername === user?.username;

    const [numberLikes, setNumberLikes] = useState();
    const [isLiked, setIsLiked] = useState(likesAmount);

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(dbDescription);
    const [description, setDescription] = useState(dbDescription);
    const inputRef = useRef(null);
    const [editionIsLoading, setEditionIsLoading] = useState(false);

    const tagStyle = {
        fontWeight: 700,
        cursor: "pointer",
    };

    function editPost() {
        if (isEditing) setEditedDescription(description);
        setIsEditing((prev) => !prev);
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

    const navigate = useNavigate();

    function redirectToUserPage() {
        setUser(user);
        navigate("/userPosts");
    }

    async function toggleLikePost(props) {
        const body = { type: props, id };
        try {
            await LinkrResources.toggleLike(body, token);
            setIsLiked(!isLiked);
            if (props === "add") {
                setNumberLikes(() => numberLikes + 1);
            }

            if (props === "remove") {
                setNumberLikes(() => numberLikes - 1);
            }
        } catch (error) {
            alert(error.response);
            console.log(error.message);
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

    console.log("deleteModalIsOpen: ", deleteModalIsOpen);
    return (
        <StyledPost>
            <LikesColumn>
                <img
                    alt="User profile"
                    src={user?.picture_url}
                    onClick={redirectToUserPage}
                />
                {isLiked ? (
                    <ion-icon
                        onClick={() => toggleLikePost("add")}
                        className="red"
                        name="heart-outline"
                        data-tooltip-content={`Você, e mais ${
                            numberLikes - 1
                        } curtiram esse post.`}
                    ></ion-icon>
                ) : (
                    <ion-icon
                        onClick={() => toggleLikePost("remove")}
                        name="heart-outline"
                        data-tooltip-content={`Curtido por ${numberLikes} pessoas.`}
                    ></ion-icon>
                )}
                <p>{numberLikes} likes</p>
            </LikesColumn>
            <PostInfos>
                <UsernameEditDelete>
                    <h4>{user?.username}</h4>
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
                                postId={id}
                                updatePosts={updatePosts}
                                deletionIsLoading={deletionIsLoading}
                                setDeletionIsLoading={setDeletionIsLoading}
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
                    <ReactTagify tagStyle={tagStyle}>
                        <p>{description}</p>
                    </ReactTagify>
                )}
                <LinkSnippet metadata={metadata} id={id} />
            </PostInfos>
        </StyledPost>
    );
}

export default Post;
