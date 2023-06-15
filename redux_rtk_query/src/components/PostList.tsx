import { useGetPostsQuery } from "../app/services/postAPI";
import { Post } from "../interface/Post";
import { Link } from "react-router-dom";
import NewPost from "./NewPost";

const PostList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery(null);
  //const [trigger, { data: posts, isLoading, error }] = useLazyGetPostsQuery(); // Hace la consulta de forma asincrona
  if (isLoading) {
    return (
      <div>
        <h1>LOADING</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>ALGO SALIO MAL</h1>
      </div>
    );
  }
  return (
    <div>
      <NewPost />
      <h1>Post List</h1>
      <Link to="/otherlist">
        <button>Ir a la otra Lista</button>
      </Link>
      <ul style={{ marginTop: "3%" }}>
        {posts?.map((post: Post) => (
          <li
            style={{ width: "80%", marginLeft: "5%", marginTop: "20px" }}
            key={post.id}>
            <Link
              to={`/details/${post.id}`}
              style={{
                textDecoration: "none",
                color: "white",
              }}>
              {post.body}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
