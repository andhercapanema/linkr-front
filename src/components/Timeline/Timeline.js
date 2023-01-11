import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Ayth";
import LinkrResources from "../../common/services/LinkrResources";
import Post from "./Post";
import { PostCard, PostForm, PostsList } from "./style";

function Timeline({ posts, updatePosts }) {
    const [form, setForm] = useState({
        link: "",
        description: "",
    });
    const { link, description } = form;
    const [formIsLoading, setFormIsLoading] = useState(false);

    const [postsAreLoading, setPostsAreLoading] = useState(true);
    const [completedPosts, setCompletedPosts] = useState([...posts]);

    const [deletionIsLoading, setDeletionIsLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState([]);

    // const [hashtags, setHashtags] = useState([]);

    const { picture: userPicture, token } = useContext(AuthContext);

    function handleForm(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function submitPost(e) {
        e.preventDefault();
        setFormIsLoading(true);

        try {
            await LinkrResources.postNewPost(form, token);
            await updatePosts();
        } catch (err) {
            alert("There was an error publishing your link");
            console.error(err.response);
        }
    }

    const getUserDataAndUrlMetadata = useCallback(async () => {
        if (posts.length === 0) return;

        try {
            const completedPostData = [...posts];

            for (const post of completedPostData) {
                const res = await LinkrResources.getUser(post.user_id, token);
                post.user = res.data;

                const metadata = await LinkrResources.getLinkMetadata(
                    post.id,
                    token
                );
                post.metadata = metadata.data;
            }

            setCompletedPosts(completedPostData);
            setPostsAreLoading(false);

            setForm({ link: "", description: "" });
            setFormIsLoading(false);

            setDeleteModal(posts.map(({ id }) => ({ id, isOpen: false })));
            setDeletionIsLoading(false);
        } catch (err) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.error(err.response);
        }
    }, [posts, token]);

    /* const getTrendingHashtags = useCallback(async () => {
        try {
            const res = await LinkrResources.getTrendingHashtags(token);
            setHashtags(res.data);
        } catch (error) {
            console.log(error.response);
            alert(error.message);
        }
    }, [token]); */

    useEffect(() => {
        getUserDataAndUrlMetadata();
        // getTrendingHashtags();
    }, [getUserDataAndUrlMetadata /* , getTrendingHashtags */]);

    console.log("posts: ", posts);
    return (
        <>
            {userPicture && (
                <PostCard>
                    {window.screen.width >= 611 && (
                        <img alt="User profile" src={userPicture} />
                    )}
                    <PostForm onSubmit={submitPost} isLoading={formIsLoading}>
                        <h3>What are you going to share today?</h3>
                        <input
                            type="url"
                            placeholder="http:// ..."
                            name="link"
                            onChange={handleForm}
                            value={link}
                            required
                            disabled={formIsLoading}
                        />
                        <input
                            type="text"
                            placeholder="Awesome article about #javascript"
                            name="description"
                            onChange={handleForm}
                            value={description}
                            disabled={formIsLoading}
                        />
                        <div>
                            {formIsLoading ? (
                                <button disabled>Publishing...</button>
                            ) : (
                                <button>Publish</button>
                            )}
                        </div>
                    </PostForm>
                </PostCard>
            )}

            {postsAreLoading ? (
                <h4>Loading...</h4>
            ) : (
                // <DividedScreen>
                <PostsList>
                    {!postsAreLoading && completedPosts.length === 0 ? (
                        <h4>There are no posts yet</h4>
                    ) : (
                        completedPosts.map((post) => (
                            <Post
                                key={post.id}
                                post={post}
                                updatePosts={updatePosts}
                                deletionIsLoading={deletionIsLoading}
                                setDeletionIsLoading={setDeletionIsLoading}
                                deleteModalIsOpen={
                                    deleteModal.filter(
                                        (postModal) => postModal.id === post.id
                                    )[0]?.isOpen
                                }
                                setDeleteModalIsOpen={(bool) => {
                                    console.log(bool);
                                    console.log(deleteModal);
                                    setDeleteModal(
                                        deleteModal.map((postModal) =>
                                            postModal.id === post.id
                                                ? { ...postModal, isOpen: bool }
                                                : postModal
                                        )
                                    );
                                }}
                            />
                        ))
                    )}
                </PostsList>
                /* {
                        <HashtagsList>
                            <h3>trending</h3>
                            <ElementsOfArray>
                                {hashtags.map((hash) => (
                                    <p>
                                        <Link to={`/hashtag/${hash}`}>
                                            {hash}
                                        </Link>
                                    </p>
                                ))}
                            </ElementsOfArray>
                        </HashtagsList>
                    }
                </DividedScreen> */
            )}
        </>
    );
}

export default Timeline;
