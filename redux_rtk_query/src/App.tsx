import { Route, BrowserRouter, Routes } from "react-router-dom";
import NewPost from "./components/NewPost";
import PostDetails from "./components/PostDetails";
import PostList from "./components/PostList";
import OtherComponent from "./components/OtherComponent";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details/:id" element={<PostDetails />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/otherlist" element={<OtherComponent />} />
        <Route path="/" element={<PostList />} />
        <Route path="*" element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
