import React, { useContext } from "react";
import ReactModal from "react-modal";
import { AuthContext } from "../../Ayth";
import LinkrResources from "../../common/services/LinkrResources";
import "./DeleteModal.css";

function DeleteModal({
    deleteModalIsOpen,
    setDeleteModalIsOpen,
    postId,
    updatePosts,
    deletionIsLoading,
    setDeletionIsLoading,
}) {
    ReactModal.setAppElement("#root");

    const { token } = useContext(AuthContext);

    async function deletePost() {
        setDeletionIsLoading(true);
        console.log("postId", postId);

        try {
            console.log("postId", postId);
            await LinkrResources.deletePost(postId, token);
            await updatePosts();
        } catch (err) {
            setDeleteModalIsOpen(false);
            setDeletionIsLoading(false);
            alert(
                "An error occured while trying to delete your post, please try again"
            );
            console.error(err.response);
        }
    }

    console.log("id: ", postId);
    return (
        <ReactModal
            isOpen={deleteModalIsOpen}
            onRequestClose={() => setDeleteModalIsOpen(false)}
            contentLabel="Delete Post Modal"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            className="Modal"
            overlayClassName="Overlay"
        >
            <h1>Are you sure you want to delete this post?</h1>
            <div>
                <button onClick={() => setDeleteModalIsOpen(false)}>
                    No, go back
                </button>
                {deletionIsLoading ? (
                    <button disabled className="is-loading">
                        Deleting...
                    </button>
                ) : (
                    <button onClick={deletePost}>Yes, delete it</button>
                )}
            </div>
        </ReactModal>
    );
}

export default DeleteModal;
