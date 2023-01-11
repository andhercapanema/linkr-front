import Post from "../../components/Timeline/Post";
import Header from "../../components/Header/Header";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import COLORS from "../../common/constants/colors";
import styled from "styled-components";
import LinkrResources from "../../common/services/LinkrResources";
import { StyledTimelinePage } from "./style";
import { PostsList } from "../../components/Timeline/style";

function HashtagPage() {
    const { hashtag } = useParams();
    const [postsAreLoading, setPostsAreLoading] = useState(true);
    const userToken = "banana";
    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const testArray = [
        "#javascript",
        "#react",
        "#react-native",
        "#material",
        "#web-dev",
        "#mobile",
        "#css",
        "#html",
        "#node",
        "#sql",
    ];

    const updatePosts = useCallback(async () => {
        try {
            const res = await LinkrResources.getHastagPosts(hashtag, userToken);
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
            console.log(err.response);
        }
    }, []);

    async function getTrendingHashtags() {
        try {
            const res = await LinkrResources.getTrendingHashtags(userToken);
            setHashtags(res.data);
        } catch (error) {
            console.log(error.response);
            alert(error.message);
        }
    }

    useEffect(() => {
        updatePosts();
        getTrendingHashtags();
    }, [updatePosts]);

    return (
        <>
            <Header />
            <StyledTimelinePage>
                <h2>#{hashtag}</h2>
                {postsAreLoading ? (
                    <h4>Loading...</h4>
                ) : (
                    <DividedScreen>
                        <PostsList>
                            {posts.length === 0 ? (
                                <h4>There are no posts yet</h4>
                            ) : (
                                posts.map((post) => (
                                    <Post key={post.id} post={post} />
                                ))
                            )}
                        </PostsList>
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
                    </DividedScreen>
                )}
            </StyledTimelinePage>
        </>
    );
}

export const DividedScreen = styled.div`
    display: flex;
`;
export const HashtagsList = styled.div`
    width: 301px;
    height: 406px;
    border-radius: 16px;
    background-color: #171717;
    font-family: "Lato";
    padding-top: 9px;

    h3 {
        font-size: 27px;
        padding-bottom: 9px;
        margin-left: 16px;
    }
`;
export const ElementsOfArray = styled.div`
    display: flex;
    text-align: left;
    justify-content: space-around;
    flex-direction: column;
    border-top: 1px grey solid;
    font-size: 19px;
    height: 90%;
    margin-left: 16px;
`;

export default HashtagPage;
