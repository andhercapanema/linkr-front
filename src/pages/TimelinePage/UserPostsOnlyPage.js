import styled from "styled-components";
import { StyledTimelinePage, PostsList } from "./style";
import Post from "./Post";
import { AuthContext } from "../../Ayth";
import { useContext } from "react";
import Header from "../../components/Header/Header";

export default function UserPostsOnly() {

    const { posts, user } = useContext(AuthContext);

    return (
        <>
            <Header />
            <StyledTimelinePage>
                <Title>
                    <img src={user.picture_url} />
                    <h1>{user.username}'s posts</h1>
                </Title>
                <PostsList>
                    {/* {posts.length === 0 ? (
                        <h4>There are no posts yet</h4>
                    ) : (
                        posts.map((post) => (
                            <Post
                                key={post.id}
                                post={post}
                                username={username}
                            />
                        ))
                    )} */}
                </PostsList>
            </StyledTimelinePage>
        </>
    )
}

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 60px;
    img{
        margin-right: 18px;
    }
    h1{
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
        letter-spacing: 0em;
        text-align: left;

    }
`