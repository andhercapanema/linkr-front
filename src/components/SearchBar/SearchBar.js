import React, { useCallback, useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Ayth";
import LinkrResources from "../../common/services/LinkrResources";
import { SearchResultList, StyledSearchBar } from "./style";

function SearchBar() {
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const updateUsers = useCallback(async () => {
        try {
            const { data } = await LinkrResources.getUsersByFollowing(token);
            setUsers(data);
        } catch (err) {
            alert(
                "An error occured while trying to fetch the users list, please refresh the page"
            );
            console.error(err.response);
        }
    }, [token]);

    function filterUsers({ target: { value } }) {
        if (value === "") return setFilteredUsers([]);
        setFilteredUsers(users.filter((user) => user.username.includes(value)));
    }

    useEffect(() => {
        updateUsers();
    }, [updateUsers]);

    return (
        <StyledSearchBar>
            <DebounceInput
                placeholder="Seach for people"
                minLength={3}
                debounceTimeout={300}
                onChange={(e) => filterUsers(e)}
            />
            <ion-icon name="search-outline"></ion-icon>
            {filteredUsers.length !== 0 && (
                <SearchResultList>
                    {filteredUsers.map(
                        ({ id, picture_url, username, isFollowing }) => (
                            <Link to={`/user/${id}`} key={id}>
                                <li>
                                    <img alt="User profile" src={picture_url} />
                                    <p>{username}</p>
                                    {isFollowing && <span>• following</span>}
                                </li>
                            </Link>
                        )
                    )}
                </SearchResultList>
            )}
        </StyledSearchBar>
    );
}

export default SearchBar;
