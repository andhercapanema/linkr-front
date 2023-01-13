import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Ayth";
import LinkrResources from "../../common/services/LinkrResources";
import { StyledFollowButton } from "./style";

function FollowButton({ followedId }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useContext(AuthContext);

    const checkIfFollowsUser = useCallback(async () => {
        try {
            const res = await LinkrResources.getFollow(followedId, token);
            setIsFollowing(res.data.id !== undefined);
        } catch (err) {
            alert("There was an error checking if you follow this user");
            console.error(err.response);
        }
    }, [token, followedId]);

    async function followUser() {
        setIsLoading(true);

        try {
            await LinkrResources.followUser({ followedId }, token);
            setIsLoading(false);
            setIsFollowing(true);
        } catch (err) {
            alert("There was an error trying to follow this user");
            console.error(err.response);
        }
    }

    async function unfollowUser() {
        setIsLoading(true);

        try {
            await LinkrResources.unfollowUser(followedId, token);
            setIsLoading(false);
            setIsFollowing(false);
        } catch (err) {
            alert("There was an error trying to unfollow this user");
            console.error(err.response);
        }
    }

    useEffect(() => {
        checkIfFollowsUser();
    }, [checkIfFollowsUser]);

    return (
        <>
            {isFollowing ? (
                <StyledFollowButton
                    isFollowing
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={unfollowUser}
                >
                    Unfollow
                </StyledFollowButton>
            ) : (
                <StyledFollowButton
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={followUser}
                >
                    Follow
                </StyledFollowButton>
            )}
        </>
    );
}

export default FollowButton;
