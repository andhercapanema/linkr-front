import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Ayth";
import LinkrResources from "../../common/services/LinkrResources";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Post from "./Post";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
  const [hashtags, setHashtags] = useState([]);
  const userToken = "banana";

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

        const metadata = await LinkrResources.getLinkMetadata(post.id, token);
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
    updateTimeline();
    getTrendingHashtags();
  }, [updateTimeline]);

    console.log(posts);
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


  return (
    <>
      <Header />
      <StyledTimelinePage>
        <h2>timeline</h2>
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
        <DividedScreen>
          <PostsList>
            {posts.length === 0 ? (
              <h4>There are no posts yet</h4>
            ) : (
              posts.map((post) => <Post key={post.id} post={post} />)
            )}
          </PostsList>
          <HashtagsList>
            <h3>trending</h3>
            <ElementsOfArray>
              {hashtags.map((hash) => (
                <p>
                  <Link to={`/hashtag/${hash}`}>{hash}</Link>
                </p>
              ))}
            </ElementsOfArray>
          </HashtagsList>
        </DividedScreen>
      </StyledTimelinePage>
    </>
  );
}

const DividedScreen = styled.div`
    display:flex;
`
const HashtagsList = styled.div`
    width: 301px;
    height: 406px;
    border-radius: 16px;
    background-color: #171717;
    font-family: "Lato";
    padding-top: 9px;
    
    h3{
        font-size: 27px;
        padding-bottom: 9px;
        margin-left: 16px;
    }
`
const ElementsOfArray = styled.div`
    display: flex;
    text-align: left;
    justify-content: space-around;
    flex-direction: column;
    border-top: 1px grey solid;
    font-size: 19px;
    height: 90%;
    margin-left: 16px;
`
export default TimelinePage;
