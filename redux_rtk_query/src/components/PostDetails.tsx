import { useGetPostByIdQuery } from "../app/services/postAPI";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isLoading, error } = useGetPostByIdQuery(id || "");
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
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default PostDetails;
