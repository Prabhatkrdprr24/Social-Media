import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { useContext, useState } from "react";
import PostListProvider from "./store/post-list-store";
import {PostList as PostListData} from "./store/post-list-store";
import WelcomeMessage from "./components/WelcomeMessage";

function App() {

  const [selectedTab, setSelectedTab] = useState("Home");

  const {postList} = useContext(PostListData);

  return (
    <PostListProvider>
      <div className="appContainer">
        <Sidebar selectedTab = {selectedTab} setSelectedTab = {setSelectedTab}></Sidebar>
        <div className="content">
          <Header></Header>
          {postList.length === 0 && selectedTab === 'Home' && <WelcomeMessage></WelcomeMessage>}
          {selectedTab === 'Home' ? <PostList /> : <CreatePost setSelectedTab={setSelectedTab} ></CreatePost>}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
