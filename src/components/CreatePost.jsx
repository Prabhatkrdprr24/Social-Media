import {PostList} from "../store/post-list-store";
import { useContext } from "react";
import { Form, redirect } from "react-router-dom";

const CreatePost = ({setSelectedTab}) => {

  const { addPost } = useContext(PostList);

  return (
    <Form method = "POST" className="create-post">

      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter Your User Id here
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="Enter your user Id..."
          name="userId"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
          name="Title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          rows = '4'
          className="form-control"
          id="body"
          placeholder="How are you feeling today..."
          name="body"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of Reactions
        </label>
        <input
          type="text"
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
          name="reactions"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space"
          name="tags"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </Form>
  );
};

export async function createPostAction(data){
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  // console.log(postData);
  
  fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  })
  .then(res => res.json())
  .then(post => {
    console.log("Got response from server", post);
  });

  return redirect("/");
}

export default CreatePost;
