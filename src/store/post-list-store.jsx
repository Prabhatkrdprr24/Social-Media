import { createContext, useReducer } from "react";

export const PostList = createContext({
    postList: [], 
    addPost: () => {}, 
    addInitialPosts: () => {},
    deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;

    if(action.type === 'ADD_POST'){
        newPostList = [action.payload, ...currPostList];
    }
    else if(action.type === 'ADD_INITIAL_POSTS'){
        newPostList = action.payload.posts;
    }
    else if(action.type === 'DELETE_POST'){
        newPostList = currPostList.filter((item) => {
            return item.id !== action.payload.postId;
    })}
    return newPostList;
};

const PostListProvider = ({children}) => {

    const [postList, dispatchPostList] = useReducer(postListReducer, []);

    const addPost = (userId, postTitle, postBody, likes, tags) => {
        // console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`);
        
        const addPostAction = {
            type: "ADD_POST",
            payload:{
                id: Date.now() ,
                title: postTitle,
                body: postBody,
                reactions:{
                    likes: likes,
                },
                userId: userId,
                tags: tags,
            }
        }
        dispatchPostList(addPostAction);
    };

    const addInitialPosts = (posts) => {
        console.log(posts);
        
        dispatchPostList({
            type:"ADD_INITIAL_POSTS",
            payload: {
                posts,
            },
        });
    }
    

    const deletePost = (postId) => {
        const deleteAction = {
            type: "DELETE_POST",
            payload:{
                postId: postId,
            },
        }
        dispatchPostList(deleteAction);
    };

    return (
        <PostList.Provider value = {
            {
                postList: postList, 
                addPost: addPost, 
                addInitialPosts: addInitialPosts,
                deletePost: deletePost,
            }
        }>
            {children}
        </PostList.Provider>
    );
}

export default PostListProvider;