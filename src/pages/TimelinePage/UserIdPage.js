import styled from "styled-components";
import { AuthContext } from "../../Ayth";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { StyledPost, LikesColumn, StyledLinkSnippet, StyledTimelinePage, PostsList } from "./style";
import COLORS from "../../common/constants/colors";
import LinkSnippet from "./LinkSnippet";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useParams } from "react-router-dom";

export default function UserId() {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);

    const { id } = useParams();
    console.log("id", id);
    console.log("data", data);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/user/${id}`)
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
                            <Teste>
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
                            </Teste>
                        </StyledPost>
                    ))}
                </PostsList>
            </StyledTimelinePage>
        </>
    );
}

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 60px;
    img {
        margin-right: 18px;
    }
    h1 {
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
        letter-spacing: 0em;
        text-align: left;
    }
`;

const Teste = styled.div`
    display: flex;
    flex-direction: column;
`;

const Username = styled.div`
    h1 {
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
    }
`;

const PostInfo = styled.div`
    margin-top: 5px;

    h1 {
        font-size: 15px;
        line-height: 18px;
        color: ${COLORS.text3};
        margin-bottom: 13px;

        @media (min-width: 611px) {
            font-size: 17px;
            line-height: 20px;
        }
    }
`;
