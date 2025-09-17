import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}

// 1) CREATE A NEW CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
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

    // Memoized value object
    const value = useMemo(() => {
        return {
            posts: searchedPosts,
            onClearPosts: handleClearPosts,
            onAddPost: handleAddPost,
            searchQuery,
            setSearchQuery,
        };
    }, [searchQuery, searchedPosts]);

    // 2) PROVIDE VALUE TO THE CHILD COMPONENTS
    return (
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    );
}

function usePosts() {
    const context = useContext(PostContext);

    // When the context hook is used in a component which is not his children, the value is going to be UNDEFINED so we can prevent the usage and throw error
    if (context === undefined)
        throw new Error("PostContext was used outside of the post provider!");

    return context;
}

export { PostProvider, usePosts };
