import { AuthContext } from "../../Ayth";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
    Data,
    PostInfo,
    StyledTimelinePage,
    Title,
    Username,
} from "../TimelinePage/style";
import {
    LikesColumn,
    PostsList,
    StyledPost,
} from "../../components/Timeline/style";

export default function UserPostsOnly() {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);

    const id = user.id;

    useEffect(() => {
        axios
            .get(`http://localhost:4000/search/${id}`)
            .then((res) => {
                console.log("res", res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log("err userPostsOnlyPag", err);
            });
    }, [id]);

    return (
        <>
            <Header />
            <StyledTimelinePage>
                {window.screen.width < 611 && <SearchBar />}
                <Title>
                    <img alt="User profile" src={user.picture_url} />
                    <h1>{user.username}'s posts</h1>
                </Title>
                <PostsList>
                    {data.map((u) => (
                        <StyledPost key={u.id}>
                            <LikesColumn>
                                <img
                                    alt="User profile"
                                    src={user.picture_url}
                                />
                                <ion-icon name="heart-outline"></ion-icon>
                                <p>{u.likesAmount} likes</p>
                            </LikesColumn>
                            <Data>
                                <Username>
                                    <h1>{user.username}</h1>
                                </Username>
                                <PostInfo>
                                    {/* <h1>{u.description}</h1> */}
                                </PostInfo>
                                {/* {<StyledLinkSnippet
                                    href={teste.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div>
                                        <h5>a</h5>
                                        <p>b</p>
                                        <h6>c</h6>
                                    </div> */}
                                {/* <div>
                                        <h5>{title}</h5>
                                        <p>{description}</p>
                                        <h6>{url}</h6>
                                    </div> */}
                                {/* <img alt="Link" src={image} /> */}
                                {/* </StyledLinkSnippet>} */}
                                {/* <LinkSnippet
                                    metadata={u.metadata}
                                    id={u.id}
                                /> */}
                            </Data>
                        </StyledPost>
                    ))}
                </PostsList>
            </StyledTimelinePage>
        </>
    );
}
