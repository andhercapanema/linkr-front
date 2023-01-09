import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Ayth";
import LinkrResources from "../../common/services/LinkrResources";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
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
    const [posts, setPosts] = useState([]);

    const { picture: userPicture, token } = useContext(AuthContext);

    function handleForm(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const updateTimeline = useCallback(async () => {
        try {
            const res = await LinkrResources.getLastPosts(token);
            const updatedPosts = res.data;

            for (const post of updatedPosts) {
                const res = await LinkrResources.getUser(post.user_id, token);
                post.user = res.data;

                const metadata = await LinkrResources.getLinkMetadata(
                    post.id,
                    token
                );
                post.metadata = metadata.data;
            }

            setPosts(updatedPosts);
            setPostsAreLoading(false);
        } catch (err) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.error(err.response);
        }
    }, [token]);

    async function submitPost(e) {
        e.preventDefault();
        setFormIsLoading(true);

        try {
            await LinkrResources.postNewPost(form, token);

            setForm({ link: "", description: "" });
            await updateTimeline();
            setFormIsLoading(false);
        } catch (err) {
            alert("There was an error publishing your link");
            console.error(err.response);
            setFormIsLoading(false);
        }
    }

    useEffect(() => {
        updateTimeline();
    }, [updateTimeline]);

    return (
        <>
            <Header />
            <StyledTimelinePage>
                {window.screen.width < 611 && <SearchBar />}
                <h2>timeline</h2>
                {userPicture && (
                    <PostCard>
                        {window.screen.width >= 611 && (
                            <img alt="User profile" src={userPicture} />
                        )}
                        <PostForm
                            onSubmit={submitPost}
                            isLoading={formIsLoading}
                        >
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
                    <PostsList>
                        {posts.length === 0 ? (
                            <h4>There are no posts yet</h4>
                        ) : (
                            posts.map((post) => (
                                <Post
                                    key={post.id}
                                    post={post}
                                    updateTimeline={updateTimeline}
                                />
                            ))
                        )}
                    </PostsList>
                )}
            </StyledTimelinePage>
        </>
    );
}

export default TimelinePage;
