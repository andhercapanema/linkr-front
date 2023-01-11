import { AuthContext } from "../../Ayth";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import COLORS from "../../common/constants/colors";
import LinkSnippet from "../../components/Timeline/LinkSnippet";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useParams } from "react-router-dom";

export default function UserId() {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/user/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log("err userPostsOnlyPag", err);
            });
    }, [id]);

    return (
        <>
            <Header />
            {/* <StyledTimelinePage>
                {window.screen.width < 611 && <SearchBar />}
                <Title>
                    <img alt="User profile" src={data[0].picture_url} />
                    <h1>{data[0].username}'s posts</h1>
                </Title>
                <PostsList>
                    {data.map((u) => (
                        <StyledPost key={u.id}>
                            <LikesColumn>
                                <img
                                    alt="User profile"
                                    src={u.picture_url}
                                />
                                <ion-icon name="heart-outline"></ion-icon>
                                <p>{u.likesAmount} likes</p>
                            </LikesColumn>
                            <Data>
                                <Username>
                                    <h1>{user.username}</h1>
                                </Username>
                                <PostInfo>
                                    <h1>{u.description}</h1>
                                </PostInfo>
                                {<StyledLinkSnippet
                                    href={teste.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div>
                                        <h5>a</h5>
                                        <p>b</p>
                                        <h6>c</h6>
                                    </div> 
                                <div>
                                        <h5>{title}</h5>
                                        <p>{description}</p>
                                        <h6>{url}</h6>
                                    </div>
                                <img alt="Link" src={image} />
                                </StyledLinkSnippet>}
                                <LinkSnippet
                                    metadata={u.metadata}
                                    id={u.id}
                                /> 
                            </Data>
                        </StyledPost>
                    ))}
                </PostsList>
            </StyledTimelinePage> */}
        </>
    );
}
