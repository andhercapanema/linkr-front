import React, { useCallback, useEffect, useState } from "react";
import LinkrResources from "../../common/services/LinkrResources";
import Post from "./Post";
import { PostCard, PostForm, PostsList, StyledTimelinePage } from "./style";

function TimelinePage() {
    const [form, setForm] = useState({
        link: "",
        description: "",
    });
    const { link, description } = form;
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [postsAreLoading, setPostsAreLoading] = useState(true);
    const userToken = "banana";
    const [posts, setPosts] = useState([]);

    function handleForm(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const updateTimeline = useCallback(async () => {
        try {
            const res = await LinkrResources.getLastPosts(userToken);
            const updatedPosts = res.data;

            for (const post of updatedPosts) {
                const res = await LinkrResources.getUser(
                    post.user_id,
                    userToken
                );
                post.user = res.data;

                const metadata = await LinkrResources.getLinkMetadata(
                    post.id,
                    userToken
                );
                post.metadata = metadata.data;
            }

            console.log(updatedPosts);
            setPosts(updatedPosts);
            setPostsAreLoading(false);
        } catch (err) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.error(err.response);
        }
    }, []);

    function submitPost(e) {
        e.preventDefault();
        setFormIsLoading(true);

        try {
            LinkrResources.postNewPost(form, userToken);

            setFormIsLoading(false);
            setForm({ link: "", description: "" });
            updateTimeline();
        } catch (err) {
            alert("There was an error publishing your link");
            console.error(err.response);
            setFormIsLoading(false);
        }
    }

    useEffect(() => {
        updateTimeline();
    }, [updateTimeline]);

    console.log(posts);
    return (
        <StyledTimelinePage>
            <h2>timeline</h2>
            <PostCard>
                {window.screen.width >= 611 ? (
                    <img
                        alt="User profile"
                        src="https://images2.alphacoders.com/495/495160.png"
                    />
                ) : (
                    ""
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
            {postsAreLoading ? (
                <h4>Loading...</h4>
            ) : (
                <PostsList>
                    {posts.length === 0 ? (
                        <h4>There are no posts yet</h4>
                    ) : (
                        posts.map((post) => <Post key={post.id} post={post} />)
                    )}
                </PostsList>
            )}
        </StyledTimelinePage>
    );
}

export default TimelinePage;
