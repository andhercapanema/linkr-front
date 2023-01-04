import api from "./api";

const headers = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const LinkrResources = {
    postNewPost: (body, token) => api.post("/posts", body, headers(token)),
    getPosts: (token) => api.get("/posts", headers(token)),
};

export default LinkrResources;
