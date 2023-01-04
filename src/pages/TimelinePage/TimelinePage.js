import React, { useEffect, useState } from "react";
import LinkrResources from "../../common/services/LinkrResources";
import { PostCard, PostForm, StyledTimelinePage } from "./style";

function TimelinePage() {
    const [form, setForm] = useState({
        link: "",
        description: "",
    });
    const { link, description } = form;
    const [isLoading, setIsLoading] = useState(false);
    const userToken = "banana";
    const [posts, setPosts] = useState([]);

    function handleForm(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function updateTimeline() {
        try {
            const res = await LinkrResources.getPosts(userToken);
            setPosts(res.data);
        } catch (err) {
            alert(err.response.data.message);
            console.error(err.response);
        }
    }

    function submitPost(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            LinkrResources.postNewPost(form, userToken);

            setIsLoading(false);
            setForm({ link: "", description: "" });
            updateTimeline();
        } catch (err) {
            alert("There was an error publishing your link");
            console.error(err.response);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        updateTimeline();
    }, []);

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
                <PostForm onSubmit={submitPost} isLoading={isLoading}>
                    <h3>What are you going to share today?</h3>
                    <input
                        type="url"
                        placeholder="http:// ..."
                        name="link"
                        onChange={handleForm}
                        value={link}
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        placeholder="Awesome article about #javascript"
                        name="description"
                        onChange={handleForm}
                        value={description}
                        disabled={isLoading}
                    />
                    <div>
                        {isLoading ? (
                            <button disabled>Publishing...</button>
                        ) : (
                            <button>Publish</button>
                        )}
                    </div>
                </PostForm>
            </PostCard>
        </StyledTimelinePage>
    );
}

export default TimelinePage;
