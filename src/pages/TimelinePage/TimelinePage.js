import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Ayth";
import LinkrResources from "../../common/services/LinkrResources";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Timeline from "../../components/Timeline/Timeline";
import { StyledTimelinePage } from "./style";

function TimelinePage() {
    const [posts, setPosts] = useState([]);
    const { token } = useContext(AuthContext);

    const updatePosts = useCallback(async () => {
        try {
            // modificar aqui para popular a variável updatedPosts com os posts do banco
            const res = await LinkrResources.getLastPosts(token);
            setPosts(res.data);
        } catch (err) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.error(err.response);
        }
    }, [token]);

    useEffect(() => {
        updatePosts();
    }, [updatePosts]);

    return (
        <>
            <Header />
            <StyledTimelinePage>
                {window.screen.width < 611 && <SearchBar />}
                <h2>timeline</h2>
                <Timeline posts={posts} updatePosts={updatePosts} />
            </StyledTimelinePage>
        </>
    );
}

export default TimelinePage;
