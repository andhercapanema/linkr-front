import api from "./api";

const headers = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const LinkrResources = {
    postNewPost: (body, token) => api.post("/posts", body, headers(token)),
    getLastPosts: (token) => api.get("/posts", headers(token)),
    getLinkMetadata: (id, token) =>
        api.get(`/posts/metadata/${id}`, headers(token)),
    getUsersByFollowing: (token) => api.get("/users/follows", headers(token)),
    getUser: (id, token) => api.get(`/users/${id}`, headers(token)),
    editPostDescription: (id, body, token) =>
        api.patch(`/posts/${id}`, body, headers(token)),
    deletePost: (id, token) => api.delete(`/posts/${id}`, headers(token)),
    followUser: (body, token) => api.post("/follows", body, headers(token)),
    unfollowUser: (id, token) => api.delete(`/follows/${id}`, headers(token)),
    getFollow: (id, token) => api.get(`/follows/${id}`, headers(token)),
    getPostsFromFollowingUsers: (token) =>
        api.get("/posts/follows", headers(token)),
    getFollowingUsersOnly: (token) =>
        api.get("/users/following", headers(token)),
};

export default LinkrResources;
