import { createContext, useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const PostList = createContext({
    postList: [], 
    addPost: () => {}, 
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

    const [fetching, setFetching] = useState(false);

    const addPost = (post) => {
        console.log("Add post called", post);
        
        
        const addPostAction = {
            type: "ADD_POST",
            payload: post, 
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
                deletePost: deletePost,
            }
        }>
            {children}
        </PostList.Provider>
    );
}

export default PostListProvider;