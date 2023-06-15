import { useAppSelector } from "../app/hooks/hooks";
import { postApi } from "../app/services/postAPI";
import { Link } from "react-router-dom";
import { Post } from "../interface/Post";

const OtherComponent = () => {
  const { data: posts } = useAppSelector(
    postApi.endpoints.getPosts.select(null)
  );
  return (
    <div>
      <h1>OTHER OTHER</h1>
      <Link to="/">
        <button>VOLVER A LA LISTA PRINCIPAL</button>
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

export default OtherComponent;
