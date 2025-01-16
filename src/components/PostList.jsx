import { useContext, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";

const PostList = () => {

  const {postList, addInitialPosts} = useContext(PostListData);
  const [dataFetched, setDataFetched] = useState(false);
  if(dataFetched == false){
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => {
        addInitialPosts(data.posts);
      });
    setDataFetched(true);
  }
    

    return (
        <>
          {postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
          {postList.map((post) => (
            <Post key={post.id} post = {post}/>
          ))}
        </>
    );
}

export default PostList;