import React, { useCallback, useEffect, useState } from "react";
import LinkrResources from "../../common/services/LinkrResources";
import Header from "../../components/Header/Header";
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
    const [user, setUser] = useState({});

    const getLoggedUserInfo = useCallback(async () => {
        try {
            const res = await LinkrResources.getLoggedUser(userToken);

            setUser(res.data);
        } catch (err) {
            alert(err.response.data.message);
            console.error(err.response);
        }
    }, []);

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

            setPosts(updatedPosts);
            setPostsAreLoading(false);
        } catch (err) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.error(err.response);
        }
    }, []);

    async function submitPost(e) {
        e.preventDefault();
        setFormIsLoading(true);

        try {
            await LinkrResources.postNewPost(form, userToken);

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
        getLoggedUserInfo();
    }, [updateTimeline, getLoggedUserInfo]);

    return (
      <>
            <Header />
            <StyledTimelinePage>
                <h2>timeline</h2>
                {user.picture_url && (
                    <PostCard>
                        {window.screen.width >= 611 && (
                            <img alt="User profile" src={user.picture_url} />
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
                <PostsList>
                    {posts.length === 0 ? (
                        <h4>There are no posts yet</h4>
                    ) : (
                        posts.map((post) => (
                            <Post key={post.id} post={post} user={user} />
                        ))
                    )}
                </PostsList>
            )}
        </StyledTimelinePage>
    );
}

export default TimelinePage;
