import { createContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}

// 1) CREATE A NEW CONTEXT
const PostContext = createContext();

function PostProvider() {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");

    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                  `${post.title} ${post.body}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
              )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    return (
        <PostContext.Provider
            value={{
                posts: searchedPosts,
                onClearPosts: handleClearPosts,
                onAddPost: handleAddPost,
                searchQuery,
                setSearchQuery,
            }}
        ></PostContext.Provider>
    );
}

export { PostProvider, PostContext };
