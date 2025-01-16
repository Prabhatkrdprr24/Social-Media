import { createContext, useReducer } from "react";

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

    else if(action.type === 'DELETE_POST'){
        newPostList = currPostList.filter((item) => {
            return item.id !== action.payload.postId;
    })}
    return newPostList;
};

const PostListProvider = ({children}) => {

    const [postList, dispatchPostList] = useReducer(postListReducer, []);

    const addPost = (userId, postTitle, postBody, reactions, tags) => {
        console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`);
        
        const addPostAction = {
            type: "ADD_POST",
            payload:{
                id: Date.now() ,
                title: postTitle,
                body: postBody,
                reactions:reactions, 
                userId: userId,
                tags: tags,
            }
        }
        dispatchPostList(addPostAction);
    };

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